import { httpError } from "@/errors/http.erros";
import { decryptToken } from "@/server/lib/jwt";
import { NextRequest, NextResponse } from "next/server";

export  async function GET(req:NextRequest,res:NextResponse){
    try {
    const accessToken = await req.cookies.get("accessToken")?.value;
    if(!accessToken){
        return NextResponse.json({message:"UnAuthorized User"},{status:401})
    }
    const tokenDecrypted = await decryptToken(accessToken)
    const extractUserName = tokenDecrypted.email.split("@")[0]
    const userData = {name:extractUserName,_id:tokenDecrypted._id,email:tokenDecrypted.email}
    return NextResponse.json({message:"Successfully FetchedUserData",userData},{status:200})

        
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