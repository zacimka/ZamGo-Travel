import mongoose from 'mongoose';

async function testConnection() {
    const uri = "mongodb+srv://zamgotravel:Nasriin0855@cluster0.xedr2uq.mongodb.net/zamgotravel";
    
    console.log("Attempting to connect to MongoDB Atlas cluster0.xedr2uq.mongodb.net...");
    try {
        await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
        console.log("✅ SUCCESS: Successfully connected to MongoDB Atlas!");
        await mongoose.disconnect();
    } catch (error: any) {
        console.error("❌ ERROR: Failed to connect to MongoDB Atlas.");
        console.error("Reason:", error.message);
    }
}

testConnection();
