import jwt from "jsonwebtoken"

interface tokensObject{
    accessToken :string,
    refreshToken:string
}
export const createTokens = (payload:object):tokensObject=>{
    const accessToken = jwt.sign(payload,process.env.TOKEN_SECRET as string,{expiresIn:"2m"})
        const refreshToken = jwt.sign(payload,process.env.TOKEN_SECRET as string,{expiresIn:"3m"})
return {accessToken,refreshToken}
}