import { registerSchema } from "../validators/loginAndRegvalidation";
import {z} from "zod"
export type RegisterForm = z.infer<typeof registerSchema>;
export type RegisterFormError = {
    email?:string,
    password?:string,
    confirmPassword?:string
}
export interface RegisterDTO {
    email:string,
    password?:string,
    confirmPassword?:string,
    photoURL?:string,
    googleID?:string 
}
export interface RegisterDTOResponse {
    status:number,
    message:string,
}
export interface googleUserData {
    email:string | null,
    photoURL:string | null,
    uid:string |null
}