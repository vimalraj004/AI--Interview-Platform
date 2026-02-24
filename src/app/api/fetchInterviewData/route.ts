import { httpError } from "@/errors/http.erros";
import { dbConnect } from "@/server/lib/db";
import { fetchInterviewService } from "@/server/services/interviewPage";
import { NextRequest, NextResponse } from "next/server";

export async function GET (req:NextRequest){
    try {
        await dbConnect();
        const interviewID =  req.nextUrl.searchParams.get("interview_id")
        console.log(interviewID,"checkfthisinterviewID")
        if(!interviewID){
            return NextResponse.json({message:'InterviewID is required'},{status:400})
        }
        const interviewData = await fetchInterviewService(interviewID)
        return NextResponse.json({message:"Successfully Fetched The Interview Datas",data:interviewData},{status:200})
        
    } catch (error) {
        console.log(error,"error")
        if(error instanceof httpError){
            return NextResponse.json({message:error.message},{status:error.statuscode})
        }
        return NextResponse.json({message:"Internal Server Error"},{status:500})
        
    }
}