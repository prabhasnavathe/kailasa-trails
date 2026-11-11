import { beforeEach, describe, expect, it, vi } from "vitest";
import type { TrpcContext } from "./_core/context";

const mockListApproved = vi.fn();
const mockListAll = vi.fn();
const mockInsert = vi.fn();
const mockUpdateStatus = vi.fn();
const mockDelete = vi.fn();

vi.mock("./db", () => ({
  listApprovedSubmissions: (...args: unknown[]) => mockListApproved(...args),
  listAllSubmissions: (...args: unknown[]) => mockListAll(...args),
  insertSubmission: (...args: unknown[]) => mockInsert(...args),
  updateSubmissionStatus: (...args: unknown[]) => mockUpdateStatus(...args),
  deleteSubmission: (...args: unknown[]) => mockDelete(...args),
}));

// storagePut returns a fake URL
vi.mock("./storage", () => ({
  storagePut: vi.fn(async () => ({
    key: "gallery/test.jpg",
    url: "/manus-storage/gallery/test.jpg",
  })),
}));

import { appRouter } from "./routers";

const anonCtx: TrpcContext = {
  user: null,
  req: { protocol: "https", headers: {} } as TrpcContext["req"],
  res: {} as TrpcContext["res"],
};

function adminCtx(): TrpcContext {
  return {
    ...anonCtx,
    user: {
      id: 1,
      openId: "admin-user",
      name: "Admin",
      email: "admin@example.com",
      loginMethod: "manus",
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    } as NonNullable<TrpcContext["user"]>,
  };
}

function regularCtx(): TrpcContext {
  return {
    ...anonCtx,
    user: {
      id: 2,
      openId: "regular-user",
      name: "Trekker",
      email: "trekker@example.com",
      loginMethod: "manus",
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    } as NonNullable<TrpcContext["user"]>,
  };
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe("gallery.listApproved", () => {
  it("returns approved submissions for anyone", async () => {
    const rows = [{ id: 1, status: "approved", name: "A" }];
    mockListApproved.mockResolvedValue(rows);
    const result = await appRouter
      .createCaller(anonCtx)
      .gallery.listApproved();
    expect(result).toEqual(rows);
  });
});

describe("gallery.submit", () => {
  it("accepts a story without a photo", async () => {
    mockInsert.mockResolvedValue(undefined);
    const caller = appRouter.createCaller(anonCtx);
    const result = await caller.gallery.submit({
      name: "Trekker One",
      email: "one@example.com",
      story: "Amazing summit!",
    });
    expect(result).toEqual({ success: true });
    expect(mockInsert).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "Trekker One",
        status: "pending",
        photoUrl: null,
      }),
    );
  });

  it("uploads and stores a photo when provided", async () => {
    mockInsert.mockResolvedValue(undefined);
    const caller = appRouter.createCaller(anonCtx);
    await caller.gallery.submit({
      name: "Trekker Two",
      email: "two@example.com",
      photoBase64: Buffer.from("fake-image-bytes").toString("base64"),
      photoName: "summit.png",
      photoType: "image/png",
    });
    expect(mockInsert).toHaveBeenCalledWith(
      expect.objectContaining({ photoUrl: "/manus-storage/gallery/test.png" }),
    );
  });

  it("rejects photos larger than 8 MB", async () => {
    const caller = appRouter.createCaller(anonCtx);
    await expect(
      caller.gallery.submit({
        name: "Trekker Three",
        email: "three@example.com",
        photoBase64: Buffer.alloc(9 * 1024 * 1024).toString("base64"),
        photoName: "big.jpg",
        photoType: "image/jpeg",
      }),
    ).rejects.toThrow();
    expect(mockInsert).not.toHaveBeenCalled();
  });
});

describe("admin procedures", () => {
  it("forbids non-admin users", async () => {
    const caller = appRouter.createCaller(regularCtx());
    await expect(caller.admin.listSubmissions()).rejects.toThrow();
    await expect(
      caller.admin.approve({ id: 1 }),
    ).rejects.toThrow();
  });

  it("allows admin to list and approve submissions", async () => {
    mockListAll.mockResolvedValue([{ id: 1, status: "pending" }]);
    mockUpdateStatus.mockResolvedValue(undefined);
    const caller = appRouter.createCaller(adminCtx());
    const list = await caller.admin.listSubmissions();
    expect(list).toHaveLength(1);
    const result = await caller.admin.approve({ id: 1 });
    expect(result).toEqual({ success: true });
    expect(mockUpdateStatus).toHaveBeenCalledWith(1, "approved");
    await caller.admin.reject({ id: 2 });
    expect(mockUpdateStatus).toHaveBeenCalledWith(2, "rejected");
    await caller.admin.deleteSubmission({ id: 3 });
    expect(mockDelete).toHaveBeenCalledWith(3);
  });
});
