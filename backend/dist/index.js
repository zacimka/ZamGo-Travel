"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const trpcExpress = __importStar(require("@trpc/server/adapters/express"));
const mongoose_1 = __importDefault(require("mongoose"));
const routers_1 = require("./routers");
const trpc_1 = require("./trpc");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/trpc', trpcExpress.createExpressMiddleware({
    router: routers_1.appRouter,
    createContext: trpc_1.createContext,
}));
const mongodb_memory_server_1 = require("mongodb-memory-server");
app.get('/', (req, res) => {
    res.send('ZamGo Backend API is running');
});
const PORT = process.env.PORT || 3000;
let MONGO_URI = process.env.MONGO_URI;
const startServer = async () => {
    if (!MONGO_URI) {
        console.log('No MONGO_URI provided in environment. Starting in-memory MongoDB server...');
        const mongod = await mongodb_memory_server_1.MongoMemoryServer.create();
        MONGO_URI = mongod.getUri();
        console.log(`In-memory database started at ${MONGO_URI}`);
    }
    try {
        await mongoose_1.default.connect(MONGO_URI);
        console.log('📦 Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`🚀 Backend server listening on port ${PORT}`);
        });
    }
    catch (error) {
        console.error('Database connection error:', error);
    }
};
startServer();
