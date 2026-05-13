import {z} from "zod"

const envSchema = z.object({
    MONGO_URL :z.string().min(1),
})

const parsedEnvData = envSchema.safeParse({
    MONGO_URL : process.env.MONGO_URL,
})
if(!parsedEnvData.success){
    throw new Error ("Invalid Env variables")
}
export const env = parsedEnvData.data