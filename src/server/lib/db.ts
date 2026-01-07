import mongoose from "mongoose";
import {env} from "@/server/config/env"
let isConnected = false;
export const dbConnect = async ()=>{
  try {
    if(isConnected) return;
    console.log("Connecting to MongoDB...");
    await mongoose.connect(env.MONGO_URL);

    isConnected = true;
    console.log("✅ Server is connected to the database");
  } catch (error) {
    console.error("❌ Database connection error:", error);
    throw error;
  }
}