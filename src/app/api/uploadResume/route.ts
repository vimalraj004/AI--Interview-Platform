import { httpError } from "@/errors/http.erros";
import { uploadResumeService } from "@/server/services/uploadResumePage";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest,res:NextResponse){
    try {
        const formData = await req.formData();
        const resumeFile = formData.get("resume") as File;
        const jobDescription = formData.get("jobDescription") as string;
        if(!resumeFile || !jobDescription){
            return NextResponse.json({message:"Resume file and job description are required"},{status:400})
        }
      const result =   await uploadResumeService(resumeFile,jobDescription);
      if(!result){
        return NextResponse.json({message:"Failed to analyze resume"},{status:400})
      }
        return NextResponse.json({message:"Resume analyzed successfully",data:result},{status:200})
        
    } catch (error) {
            console.error("🔥 ERROR:", error);
                if(error instanceof httpError){
                    return NextResponse.json({message:error.message},{status:error.statuscode})
                }
                return NextResponse.json({message:"Internal Server Error"},{status:500})
    }
}