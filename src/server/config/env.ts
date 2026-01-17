import {z} from "zod"

const envSchema = z.object({
    MONGO_URL :z.string().url(),
    NEXT_PUBLIC_BASE_URL:z.string().url()
})

const parsedEnvData = envSchema.safeParse({
    MONGO_URL : process.env.MONGO_URL,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL
})
if(!parsedEnvData.success){
    throw new Error ("Invalid Env variables")
}
export const env = parsedEnvData.data