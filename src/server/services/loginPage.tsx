import { loginFormDTO } from "@/app/types/loginPage";
import { findUserEmail } from "../controllers/loginController";
import { comparePassword } from "../lib/bcrypt";
import { httpError } from "@/errors/http.erros";
export const loginService = async (payload:loginFormDTO):Promise<string>=>{
    const {email,password} = payload
    const account = await findUserEmail(email) 
    console.log(account,"checkaccount")
   const verifyPassword =  await comparePassword(password,account.password)
   if(!verifyPassword){
    throw new httpError("Wrong Password ",400)
   }
   return account._id

}