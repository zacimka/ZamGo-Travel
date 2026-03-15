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
      console.log("Attempting JWT verify...");
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "secret",
      ) as any;
      console.log(`Token verified for user ID: ${decoded.id}`);
      
      console.log("Attempting User.findById...");
      user = await User.findById(decoded.id);
      if (!user) {
        console.log(`User not found in DB for ID: ${decoded.id}`);
      } else {
        console.log(`User found: ${user.email}`);
      }
    } catch (e) {
      console.log("Token verification process failed:");
      console.log("Error object:", e);
      console.log("Error message:", e instanceof Error ? e.message : e);
      if (e instanceof Error && e.stack) {
        console.log("Stack trace:", e.stack);
      }
    }
  } else {
    if (authHeader) console.log("Malformed auth header or missing Bearer prefix");
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
