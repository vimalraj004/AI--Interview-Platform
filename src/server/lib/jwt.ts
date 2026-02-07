import jwt, { JwtPayload } from "jsonwebtoken"

interface tokensObject{
    accessToken :string,
    refreshToken:string
}
interface tokenPayload extends JwtPayload{
    _id:string,
    email:string
}
export const createTokens = (payload:object):tokensObject=>{
    const accessToken = jwt.sign(payload,process.env.TOKEN_SECRET as string,{expiresIn:"2m"})
        const refreshToken = jwt.sign(payload,process.env.TOKEN_SECRET as string,{expiresIn:"3m"})
return {accessToken,refreshToken}
}
export const decryptToken = (token:string):tokenPayload=>{
   const tokenData =  jwt.verify(token,process.env.TOKEN_SECRET as string) as tokenPayload
    const {email,_id}= tokenData
    return{email,_id}
}