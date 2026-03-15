import mongoose from 'mongoose';
import { Booking } from './src/models/Booking.js'; // Ensure correct path/export
import 'dotenv/config';

async function listBookings() {
    const uri = process.env.MONGO_URI || "mongodb+srv://zamgotravel:Nasriin0855@cluster0.xedr2uq.mongodb.net/zamgotravel";
    
    try {
        await mongoose.connect(uri);
        // We will fetch directly from mongoose without importing the app model if possible, 
        // to avoid TS compilation issues in this test script, or just require it.
        const bookings = await mongoose.connection.db.collection('bookings').find({}).toArray();
        console.log("Total Bookings in Database:", bookings.length);
        console.log(JSON.stringify(bookings, null, 2));
        await mongoose.disconnect();
    } catch (error) {
        console.error("❌ ERROR:", error.message);
    }
}

listBookings();
