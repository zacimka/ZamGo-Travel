import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import * as trpcExpress from '@trpc/server/adapters/express';
import mongoose from 'mongoose';
import { appRouter } from './routers';
import { createContext } from './trpc';

const app = express();
app.use(cors());
app.use(express.json());

app.use(
    '/api/trpc',
    trpcExpress.createExpressMiddleware({
        router: appRouter,
        createContext,
    })
);

import { MongoMemoryServer } from 'mongodb-memory-server';

app.get('/', (req, res) => {
    res.send('ZamGo Backend API is running');
});

const PORT = process.env.PORT || 3000;
let MONGO_URI = process.env.MONGO_URI;

const startServer = async () => {
    if (!MONGO_URI) {
        console.log('No MONGO_URI provided in environment. Starting in-memory MongoDB server...');
        const mongod = await MongoMemoryServer.create();
        MONGO_URI = mongod.getUri();
        console.log(`In-memory database started at ${MONGO_URI}`);
    }

    try {
        await mongoose.connect(MONGO_URI);
        console.log('📦 Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`🚀 Backend server listening on port ${PORT}`);
        });
    } catch (error) {
        console.error('Database connection error:', error);
    }
};

startServer();
