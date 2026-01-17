import { RegisterDTO } from "@/app/types/signUpPage";
import user from "../models/userModel";
import { NextResponse } from "next/server";
export const register = async(payload:RegisterDTO)=>{
    const {email,password,confirmPassword} = payload
    try {
        const duplicateemail = await user.findOne({email})
        if(duplicateemail){
                throw new Error("EMAIL_EXISTS");     
               }
        console.log("new user")
  return {email};
 
    } catch (error) {
            console.log(error)
  throw new Error("Internal Server Error");    }
}