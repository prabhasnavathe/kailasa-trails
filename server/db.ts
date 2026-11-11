import { desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import fs from "fs";
import path from "path";
import {
  gallerySubmissions,
  InsertGallerySubmission,
  InsertUser,
  users,
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ==========================================
// Local JSON Storage Fallback for Gallery
// ==========================================
export interface LocalSubmission {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  trek: string | null;
  story: string | null;
  photoUrl: string | null;
  photoKey: string | null;
  status: "pending" | "approved" | "rejected";
  createdAt: Date;
}

const DATA_DIR = path.resolve(process.cwd(), "data");
const SUBMISSIONS_FILE = path.join(DATA_DIR, "gallery_submissions.json");

function ensureDataFile() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(SUBMISSIONS_FILE)) {
      fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify([], null, 2), "utf-8");
    }
  } catch (e) {
    console.error("[LocalDB] Failed to ensure data file:", e);
  }
}

function readLocalSubmissions(): LocalSubmission[] {
  ensureDataFile();
  try {
    const raw = fs.readFileSync(SUBMISSIONS_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    return parsed.map((item: any) => ({
      ...item,
      createdAt: new Date(item.createdAt),
    }));
  } catch (err) {
    console.error("[LocalDB] Error reading submissions file:", err);
    return [];
  }
}

function writeLocalSubmissions(subs: LocalSubmission[]) {
  ensureDataFile();
  try {
    fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(subs, null, 2), "utf-8");
  } catch (err) {
    console.error("[LocalDB] Error writing submissions file:", err);
  }
}

// ==========================================
// Gallery submissions (with MySQL + Local Fallback)
// ==========================================
export async function listApprovedSubmissions() {
  const db = await getDb();
  if (db) {
    try {
      return await db
        .select()
        .from(gallerySubmissions)
        .where(eq(gallerySubmissions.status, "approved"))
        .orderBy(desc(gallerySubmissions.createdAt));
    } catch (e) {
      console.warn("[Database] MySQL query failed, using local JSON fallback");
    }
  }

  const subs = readLocalSubmissions();
  return subs
    .filter((s) => s.status === "approved")
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

export async function listAllSubmissions() {
  const db = await getDb();
  if (db) {
    try {
      return await db
        .select()
        .from(gallerySubmissions)
        .orderBy(desc(gallerySubmissions.createdAt));
    } catch (e) {
      console.warn("[Database] MySQL query failed, using local JSON fallback");
    }
  }

  const subs = readLocalSubmissions();
  return subs.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

export async function insertSubmission(data: InsertGallerySubmission) {
  const db = await getDb();
  if (db) {
    try {
      await db.insert(gallerySubmissions).values(data);
      return;
    } catch (e) {
      console.warn("[Database] MySQL insert failed, saving to local JSON fallback");
    }
  }

  const subs = readLocalSubmissions();
  const nextId = subs.length > 0 ? Math.max(...subs.map((s) => s.id)) + 1 : 1;
  const newSubmission: LocalSubmission = {
    id: nextId,
    name: data.name,
    email: data.email,
    phone: data.phone ?? null,
    trek: data.trek ?? null,
    story: data.story ?? null,
    photoUrl: data.photoUrl ?? null,
    photoKey: data.photoKey ?? null,
    status: (data.status as any) || "pending",
    createdAt: new Date(),
  };

  subs.push(newSubmission);
  writeLocalSubmissions(subs);
}

export async function updateSubmissionStatus(
  id: number,
  status: "pending" | "approved" | "rejected",
) {
  const db = await getDb();
  if (db) {
    try {
      await db
        .update(gallerySubmissions)
        .set({ status })
        .where(eq(gallerySubmissions.id, id));
      return;
    } catch (e) {
      console.warn("[Database] MySQL update failed, updating in local JSON fallback");
    }
  }

  const subs = readLocalSubmissions();
  const target = subs.find((s) => s.id === id);
  if (target) {
    target.status = status;
    writeLocalSubmissions(subs);
  }
}

export async function deleteSubmission(id: number) {
  const db = await getDb();
  if (db) {
    try {
      await db.delete(gallerySubmissions).where(eq(gallerySubmissions.id, id));
      return;
    } catch (e) {
      console.warn("[Database] MySQL delete failed, deleting from local JSON fallback");
    }
  }

  const subs = readLocalSubmissions();
  const filtered = subs.filter((s) => s.id !== id);
  writeLocalSubmissions(filtered);
}
