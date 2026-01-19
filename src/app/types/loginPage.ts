import { loginSchema } from "../validators/loginAndRegvalidation";
import {z} from "zod"
export type loginForm = z.infer< typeof loginSchema>
export type loginFromError = {
    email?:string,
    password?:string
}