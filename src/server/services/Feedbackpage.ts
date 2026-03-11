import { getFeedback } from "../controllers/interviewController";
import { feedbackDatas } from "../types/interviewDatas";

export const feedbackService = async(body:feedbackDatas)=>{
return getFeedback(body);
}