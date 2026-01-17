import { RegisterDTO } from "@/app/types/signUpPage";
import user from "../models/userModel";
import { NextResponse } from "next/server";
export const register = async(payload:RegisterDTO)=>{
    const {email,password,confirmPassword} = payload
    try {
        const duplicateemail = await user.findOne(email)
        if(duplicateemail){
            return NextResponse.json({status:409,message:"Email is already registerd"})
        }
        console.log("new user")
        
    } catch (error) {
        
    }
}