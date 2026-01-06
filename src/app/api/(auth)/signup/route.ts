import { dbConnect } from "@/server/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    await dbConnect()
   return NextResponse.json({message:"ok"}) 
}