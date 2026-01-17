import { registerSchema } from "@/app/validators/loginAndRegvalidation";
import { dbConnect } from "@/server/lib/db";
import { NextRequest, NextResponse } from "next/server";
import {registerUser} from "@/server/services/registerpage"
export async function POST(req:NextRequest) {
    try {
    await dbConnect()
   let body = await req.json()
       console.log(body,"body")

  const parsedData = registerSchema.safeParse(body)
  if(!parsedData.success){
    return NextResponse.json({status:400,message:"validation Failed",errors:parsedData.error.flatten().fieldErrors})
  }
    let payload ={
      email:parsedData.data?.email,
      password:parsedData.data?.password,
      confirmPassword:parsedData.data?.confirmPassword
    }
  return await registerUser(payload)
        
    } catch (error) {
        return NextResponse.json({status:500,message:"Internal Server Error"})
    }
 
}