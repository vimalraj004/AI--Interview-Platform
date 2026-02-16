import { saveInterviewDatas } from "../controllers/interviewController";
import { interviewdatas } from "../types/interviewDatas";

export const saveInterviewService =async (body:interviewdatas)=>{
return await saveInterviewDatas(body)
}