import { loginSchema } from "@/app/validators/loginAndRegvalidation";
import { httpError } from "@/errors/http.erros";
import { dbConnect } from "@/server/lib/db";
import { NextRequest, NextResponse } from "next/server";
import {loginService} from "@/server/services/loginPage"
import { createTokens } from "@/server/lib/jwt";
export async function POST (req:NextRequest){
try {
    await dbConnect();
    const body = await req.json()
    const parsedData = loginSchema.safeParse(body)
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
    const tokensCreated = await createTokens(user)
    const response =  NextResponse.json(
        {message:"Login Successfully",
        },
        {status:200},
    )
    response.cookies.set("accessToken",tokensCreated.accessToken,{
        httpOnly:true,
        secure:false,
        sameSite:"strict",
        maxAge:3600
    })
     response.cookies.set("refreshToken",tokensCreated.refreshToken,{
        httpOnly:true,
        secure:false,
        sameSite:"strict",
        maxAge:7200
    })
    return response
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