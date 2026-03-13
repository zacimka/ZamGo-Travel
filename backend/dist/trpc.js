"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminProcedure = exports.protectedProcedure = exports.publicProcedure = exports.router = exports.createContext = void 0;
const server_1 = require("@trpc/server");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("./models/User");
const createContext = async ({ req, res }) => {
    let user = null;
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        try {
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'secret');
            user = await User_1.User.findById(decoded.id);
        }
        catch (e) {
            // invalid token
        }
    }
    return { req, res, user };
};
exports.createContext = createContext;
const t = server_1.initTRPC.context().create();
exports.router = t.router;
exports.publicProcedure = t.procedure;
const isAuthed = t.middleware(({ next, ctx }) => {
    if (!ctx.user) {
        throw new server_1.TRPCError({ code: 'UNAUTHORIZED' });
    }
    return next({
        ctx: {
            user: ctx.user,
        },
    });
});
const isAdmin = t.middleware(({ next, ctx }) => {
    if (!ctx.user || ctx.user.role !== 'admin') {
        throw new server_1.TRPCError({ code: 'UNAUTHORIZED', message: 'Admin access required' });
    }
    return next({
        ctx: {
            user: ctx.user,
        },
    });
});
exports.protectedProcedure = t.procedure.use(isAuthed);
exports.adminProcedure = t.procedure.use(isAdmin);
