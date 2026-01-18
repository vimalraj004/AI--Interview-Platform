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
    password:string,
    confirmPassword:string
}
export interface RegisterDTOResponse {
    status:number,
    message:string,
    userdata:object,
}
