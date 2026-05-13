import { httpError } from "@/errors/http.erros";
import { dbConnect } from "@/server/lib/db";
import Feedback from "@/server/models/feedbackModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    try {
          await dbConnect();   
            const interveiwId = req.nextUrl.searchParams.get("interviewId");
            if(!interveiwId){
                return NextResponse.json({message:'Interview ID is required'}, {status:400});
            }
            // Fetch feedback details based on the interview ID
            // Assuming you have a Feedback model and it has a reference to the interview ID
            const feedbackDetails = await Feedback.findOne({ interviewID: interveiwId }).select("-__v -updatedAt");
            if(!feedbackDetails){
                return NextResponse.json({message:'Feedback details not found for this interview'}, {status:404});
            }
            return NextResponse.json({message:"Successfully Fetched The Feedback Details",feedbackDetails}, {status:200});
    } catch (error) {
           console.error(error);   
            if(error instanceof httpError){
                return NextResponse.json({message:error.message}, {status:error.statuscode});   
            }   
            return NextResponse.json({message:"Internal Server Error"}, {status:500});      
    }
}
    
