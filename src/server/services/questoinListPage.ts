import { NewFormData } from "@/app/types/newInterivewFormpage";
import { fetchQuestionList } from "../controllers/questionListController";

export const questionListService = async (body:NewFormData)=>{
     return fetchQuestionList(body);
}