import mongoose from 'mongoose';
import { User } from './src/models/User';
import 'dotenv/config';

async function check() {
    const MONGO_URI = process.env.MONGO_URI;
    if (!MONGO_URI) {
        console.log("No MONGO_URI");
        return;
    }
    await mongoose.connect(MONGO_URI);
    const users = await User.find({ role: 'admin' });
    console.log("Admin users found:", users.length);
    users.forEach(u => console.log(`Email: ${u.email}, Role: ${u.role}`));
    await mongoose.disconnect();
}

check();
