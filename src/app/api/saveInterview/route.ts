import { interviewdatas } from "@/app/validators/saveInterviews";
import { httpError } from "@/errors/http.erros";
import { dbConnect } from "@/server/lib/db";
import { saveInterviewService } from "@/server/services/interviewPage";
import { NextRequest, NextResponse } from "next/server";

export  async function POST(req:NextRequest) {
    try {
        await dbConnect()
        let body = await req.json()
       const parsedData = await interviewdatas.safeParse(body)
          if (!parsedData.success) {
      return NextResponse.json({
        status: 400,
        message: "Invalid Credentials",
        errors: parsedData.error.flatten().fieldErrors,
      });
    }
   const result =  await saveInterviewService(body)
    console.log(result,"interviewresult")
    return NextResponse.json({message:"Interview Created",data:result,},{status:200})
        
    } catch (error) {
        if(error instanceof httpError){
            return NextResponse.json({message:error.message},{status:error.statuscode})
        }
        return NextResponse.json({message:"Internal Server Error"},{status:500})
    }
}