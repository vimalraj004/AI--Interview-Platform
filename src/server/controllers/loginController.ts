import { loginFormDTO } from "@/app/types/loginPage"
import user from "../models/userModel"
import { httpError } from "@/errors/http.erros"
import { Document } from "mongodb"

export interface Iuser extends Document{
    email:string,
    password:string
}
export const findUserEmail = async (email:string):Promise<Iuser>=>{
      const account = await user.findOne({email})
      if(!account){
        throw new httpError("User Not Found",404)
      }
      return account
}