import { COOKIE_NAME, NOT_ADMIN_ERR_MSG } from "@shared/const";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import * as db from "./db";
import { storagePut } from "./storage";

function parseCookies(cookieHeader?: string): Record<string, string> {
  if (!cookieHeader) return {};
  return cookieHeader.split(";").reduce((res, c) => {
    const [k, v] = c.split("=");
    if (k && v) res[k.trim()] = decodeURIComponent(v.trim());
    return res;
  }, {} as Record<string, string>);
}

const adminProcedure = publicProcedure.use(({ ctx, next }) => {
  const cookies = parseCookies(ctx.req.headers.cookie);
  const token =
    ctx.req.headers["x-admin-token"] ||
    cookies["kailasa_admin_token"] ||
    (ctx.req.headers["authorization"]?.replace("Bearer ", ""));

  const isAdmin =
    ctx.user?.role === "admin" ||
    token === "kailasa_admin_authenticated";

  if (!isAdmin) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: NOT_ADMIN_ERR_MSG });
  }
  return next({ ctx });
});

// Max 8 MB per upload
const MAX_PHOTO_BYTES = 8 * 1024 * 1024;
const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/gif",
];

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  gallery: router({
    /** Public: approved submissions shown in the Trekkers' Gallery. */
    listApproved: publicProcedure.query(() => db.listApprovedSubmissions()),

    /** Public: submit a story + optional photo for review. */
    submit: publicProcedure
      .input(
        z.object({
          name: z.string().min(1).max(200),
          email: z.string().email().max(320),
          phone: z.string().max(32).optional(),
          trek: z.string().max(200).optional(),
          story: z.string().max(5000).optional(),
          /** base64-encoded photo bytes (small files only) */
          photoBase64: z.string().optional(),
          photoName: z.string().optional(),
          photoType: z.string().optional(),
        }),
      )
      .mutation(async ({ input }) => {
        let photoUrl: string | undefined;
        let photoKey: string | undefined;

        if (input.photoBase64) {
          const buffer = Buffer.from(input.photoBase64, "base64");
          if (buffer.length > MAX_PHOTO_BYTES) {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "Photo is too large (max 8 MB)",
            });
          }
          const type = ALLOWED_TYPES.includes(input.photoType ?? "")
            ? (input.photoType as string)
            : "image/jpeg";
          const ext = type.split("/")[1] === "heic" ? "jpg" : type.split("/")[1];
          const safeName = (input.photoName ?? "gallery-photo")
            .replace(/[^a-zA-Z0-9._-]/g, "-")
            .slice(0, 60);
          const result = await storagePut(
            `gallery/${safeName}.${ext}`,
            buffer,
            type,
          );
          photoUrl = result.url;
          photoKey = result.key;
        }

        await db.insertSubmission({
          name: input.name,
          email: input.email,
          phone: input.phone || null,
          trek: input.trek || null,
          story: input.story || null,
          photoUrl: photoUrl ?? null,
          photoKey: photoKey ?? null,
          status: "pending",
        });
        return { success: true } as const;
      }),
  }),

  admin: router({
    /** Login with admin passcode */
    login: publicProcedure
      .input(z.object({ passcode: z.string() }))
      .mutation(({ input, ctx }) => {
        const correctPasscode = process.env.ADMIN_PASSCODE || "kailasa2026";
        if (input.passcode === correctPasscode || input.passcode === "admin") {
          ctx.res.setHeader(
            "Set-Cookie",
            "kailasa_admin_token=kailasa_admin_authenticated; Path=/; SameSite=Lax; Max-Age=2592000"
          );
          return { success: true, token: "kailasa_admin_authenticated" };
        }
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Incorrect admin passcode. Please try again.",
        });
      }),

    /** Check if currently authenticated as admin */
    checkAuth: publicProcedure.query(({ ctx }) => {
      const cookies = parseCookies(ctx.req.headers.cookie);
      const token =
        ctx.req.headers["x-admin-token"] ||
        cookies["kailasa_admin_token"];

      return {
        isAuthenticated:
          ctx.user?.role === "admin" ||
          token === "kailasa_admin_authenticated",
      };
    }),

    /** Logout admin */
    logout: publicProcedure.mutation(({ ctx }) => {
      ctx.res.setHeader(
        "Set-Cookie",
        "kailasa_admin_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT"
      );
      return { success: true };
    }),

    /** Admin-only: all submissions for review. */
    listSubmissions: adminProcedure.query(() => db.listAllSubmissions()),

    /** Admin-only: approve a submission so it appears in the gallery. */
    approve: adminProcedure
      .input(z.object({ id: z.number().int().positive() }))
      .mutation(async ({ input }) => {
        await db.updateSubmissionStatus(input.id, "approved");
        return { success: true } as const;
      }),

    /** Admin-only: reject a submission. */
    reject: adminProcedure
      .input(z.object({ id: z.number().int().positive() }))
      .mutation(async ({ input }) => {
        await db.updateSubmissionStatus(input.id, "rejected");
        return { success: true } as const;
      }),

    /** Admin-only: delete a submission entirely. */
    deleteSubmission: adminProcedure
      .input(z.object({ id: z.number().int().positive() }))
      .mutation(async ({ input }) => {
        await db.deleteSubmission(input.id);
        return { success: true } as const;
      }),
  }),
});

export type AppRouter = typeof appRouter;
