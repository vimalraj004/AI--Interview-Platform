import { RegisterDTO } from "@/app/types/signUpPage";
import { NextResponse } from "next/server";
import {register} from "@/server/controllers/registerController"
export const registerUser = async (payload:RegisterDTO)=>{
    try {
        return await register(payload)
        
    } catch (error) {
            console.log(error)
            throw new Error
    }
}