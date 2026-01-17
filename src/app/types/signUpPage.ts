import { registerSchema } from "../validators/loginAndRegvalidation";
import {z} from "zod"
export type RegisterForm = z.infer<typeof registerSchema>;
export type RegisterFormError = {
    email?:String,
    password?:String,
    confirmPassword?:String
}
export interface RegisterDTO {
    email:String,
    password:String,
    confirmPassword:string
}
export interface RegisterDTOResponse {
    message:String,
    userId:String,
}
