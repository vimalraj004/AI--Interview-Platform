import {email, z} from "zod"
export const registerSchema = z.object({
    email:z.string().email("Invalid email address"),
    password:z.string().min(8,"Password must be at least 8 characters"),
    confirmPassword:z.string()

})
.refine((data)=>data.password === data.confirmPassword,{
    path :["confirmPassword"],
    message:"Passwords doesnt matched"
})
export const googleRegisterSchema = z.object({
    email:z.string().email("Invalid email address"),
    photoURL:z.string(),
    googleID:z.string()
})

export const loginSchema = z.object({
    email:z.string().email("Invalid email address"),
    password:z.string()
})
export const googleLoginSchema = z.object({
    email:z.string().email("Invalid email address"),
    googleID:z.string()
})