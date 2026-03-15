/// <reference types="node" />
import { initTRPC, TRPCError } from "@trpc/server";
import { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import * as jwt from "jsonwebtoken";
import { User, IUser } from "./models/User";

export const createContext = async ({
  req,
  res,
}: CreateExpressContextOptions) => {
  let user: IUser | null = null;
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "secret",
      ) as any;
      user = await User.findById(decoded.id);
    } catch (e) {
      // invalid token
    }
  }
  return { req, res, user };
};
export type Context = Awaited<ReturnType<typeof createContext>>;

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

const isAuthed = t.middleware((opts) => {
  const { next, ctx } = opts;
  if (!ctx.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      user: ctx.user,
    },
  });
});

const isAdmin = t.middleware((opts) => {
  const { next, ctx } = opts;
  if (!ctx.user || ctx.user.role !== "admin") {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Admin access required",
    });
  }
  return next({
    ctx: {
      user: ctx.user,
    },
  });
});

export const protectedProcedure = t.procedure.use(isAuthed);
export const adminProcedure = t.procedure.use(isAdmin);
