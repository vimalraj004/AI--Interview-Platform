import { httpError } from "@/errors/http.erros";
import { dbConnect } from "@/server/lib/db";
import InterviewData from "@/server/models/interviewModel";
import { NextRequest, NextResponse } from "next/server";
import "@/server/models/feedbackModel";
export async function GET(req:NextRequest, res:NextResponse) {
try {
            console.log("hei ru comming here1")

    await dbConnect();    
    const email = req.nextUrl.searchParams.get("email");
    const allInterviewsParam = req.nextUrl.searchParams.get("allInterviews");
    const scheduledInterviewsParam = req.nextUrl.searchParams.get("scheduledInterviews");
        console.log( typeof scheduledInterviewsParam,"hei ru comming here2")

    if(!email){
        return NextResponse.json({message:'Email is required'}, {status:400});
    }
    let latestInterviews
    if(allInterviewsParam === "true"){
                console.log(allInterviewsParam,"hei ru comming here3")

        latestInterviews = await InterviewData.find({userEmail:email}).sort({createdAt:-1}).select("-__v -updatedAt -interviewTypes -feedback");

    }else if(scheduledInterviewsParam === "true"){
        console.log("hei ru comming here4")
     latestInterviews = await InterviewData.find({userEmail:email}).sort({createdAt:-1}).populate("feedback").select("-__v -updatedAt -interviewTypes ");
     console.log("latestInterviews:",latestInterviews)
    }else{
                console.log("hei ru comming here5")

        latestInterviews = await InterviewData.find({userEmail:email}).sort({createdAt:-1}).limit(6).select("-__v -updatedAt -interviewTypes -feedback");
    }
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