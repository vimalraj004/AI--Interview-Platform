import mongoose from "mongoose";
const MONGO_URL = process.env.MONGO_URL;
if (!MONGO_URL) {
  throw new Error("MONGO_URL is not defined in environment variables");
}
let isConnected = false;
export const dbConnect = async ()=>{
  try {
    if(isConnected) return;
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGO_URL);

    isConnected = true;
    console.log("✅ Server is connected to the database");
  } catch (error) {
    console.error("❌ Database connection error:", error);
    throw error;
  }
}