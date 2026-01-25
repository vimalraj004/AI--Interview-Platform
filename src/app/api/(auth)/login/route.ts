import { loginSchema } from "@/app/validators/loginAndRegvalidation";
import { httpError } from "@/errors/http.erros";
import { dbConnect } from "@/server/lib/db";
import { NextRequest, NextResponse } from "next/server";
import {loginService} from "@/server/services/loginPage"
export async function POST (req:NextRequest){
try {
    await dbConnect();
    const body = await req.json()
    console.log(body,"body")
    const parsedData = loginSchema.safeParse(body)
    console.log(parsedData, "parsedData");
    if(!parsedData.success){
        return NextResponse.json(
            {
                status:400,
                message:"Invalid Credentials",
                errors:parsedData.error.flatten().fieldErrors
            }
        )
    }
    let payload ={
        email:parsedData.data.email,
        password:parsedData.data.password
    }
    const user = await loginService(payload);
    return NextResponse.json(
        {message:"Login Successfully",
          userId:user
        },
        {status:200},
    )
} catch (error) {
    console.log(error)
    if(error instanceof httpError){
        return NextResponse.json(
            {message:error.message},
            {status:error.statuscode}
            
        )
    }
    return NextResponse.json(
        {message:"Internal Server Error"},
        {status:500}
    )
}
}