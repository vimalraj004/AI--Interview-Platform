import { httpError } from "@/errors/http.erros";
import { dbConnect } from "@/server/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST (req:NextRequest){
    try {
        await dbConnect();
        const response = NextResponse.json({message:"logout Successfully"},{status:200})
        response.cookies.delete("accessToken")
        response.cookies.delete("refreshToken")
        return response;
        
    } catch (error) {
        if(error instanceof(httpError)){
            return NextResponse.json({message:error.message},{status:error.statuscode})
        }
        return NextResponse.json({message:"Internal Server Error"},{status:500})
        
    }
}