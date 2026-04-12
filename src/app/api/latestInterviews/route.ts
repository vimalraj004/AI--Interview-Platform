import { httpError } from "@/errors/http.erros";
import { dbConnect } from "@/server/lib/db";
import InterviewData from "@/server/models/interviewModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest, res:NextResponse) {
try {
    await dbConnect();    
    const email = req.nextUrl.searchParams.get("email");
    if(!email){
        return NextResponse.json({message:'Email is required'}, {status:400});
    }
  const latestInterviews = await InterviewData.find({userEmail:email}).sort({createdAt:-1}).limit(6).select("-__v -updatedAt -interviewTypes");
  if(latestInterviews.length === 0){
    return NextResponse.json({message:'No interviews found for this user'}, {status:404});
  }
  return NextResponse.json({message:"Successfully Fetched The Latest Interviews",data:latestInterviews}, {status:200});

    
} catch (error) {
    console.error(error);   
    if(error instanceof httpError){
        return NextResponse.json({message:error.message}, {status:error.statuscode});   
    }   
    return NextResponse.json({message:"Internal Server Error"}, {status:500});        
  
}
}