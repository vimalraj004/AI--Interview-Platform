import { fetchInterviewDatas, saveInterviewDatas } from "../controllers/interviewController";
import { interviewdatas } from "../types/interviewDatas";

export const saveInterviewService =async (body:interviewdatas)=>{
return await saveInterviewDatas(body)
}

export const fetchInterviewService = async(interviewID:string)=>{
    return await fetchInterviewDatas(interviewID)
}