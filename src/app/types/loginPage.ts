import { loginSchema } from "../validators/loginAndRegvalidation";
import {z} from "zod"
export type loginForm = z.infer< typeof loginSchema>
export type loginFromError = {
    email?:string,
    password?:string
}
export interface loginFormDTO{
    email:string,
    password:string
}
export interface loginrFormResponse {
    status:number,
    message:string,
    userId:string
}