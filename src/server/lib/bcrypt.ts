import bcrypt from "bcryptjs"

export const hashPassword = (password:string):Promise<string>=>{
    const hashedPassword = bcrypt.hash(password,10) // this one will return promise thats y  this over all function output become Promise<string>
    return hashedPassword
}