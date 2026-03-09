import { httpError } from "@/errors/http.erros";
import { dbConnect } from "@/server/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest){
    try {
        await dbConnect();
       const body =  await request.json()
        
    } catch (error) {
        console.log(error,"feedback error");
        if(error instanceof httpError){
            return NextResponse.json({message:error.message},{status:error.statuscode})
        }
        return NextResponse.json({message:"Internal Server Error"},{status:500})
    }
}