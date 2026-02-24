
import { httpError } from "@/errors/http.erros";
import InterviewData from "../models/interviewModel";
import Questions from "../models/questionsModel";
import { interviewdatas } from "../types/interviewDatas";

export const saveInterviewDatas =async (body:interviewdatas)=>{
    const {
      jobPosition,
      duration,
      jobDescription,
      interviewTypes,
      questionList,
    } = body;
const interview = await InterviewData.create({
      jobPosition,
      duration,
      jobDescription,
      interviewTypes,
    })
    if(!interview){
        throw new httpError("Failed to create Interview",400)
    }
    const formatedQuestions= questionList.map((question)=>({
        ...question,
        interviewID:interview._id

    }))
 const questions = await Questions.insertMany(formatedQuestions)
     if(!questions){
                throw new httpError("Failed to create InterviewQuestion",400)

    }
    return interview._id

}

export const fetchInterviewDatas =async(interviewID:string)=>{
    const data = await InterviewData.findById(interviewID).select("-_id jobPosition duration -interviewTypes ").populate({path:"questionList",select:"-_id question type -interviewID"}).lean();
    console.log(data,"check this data")
    return data
}