
import { httpError } from "@/errors/http.erros";
import InterviewData from "../models/interviewModel";
import Questions from "../models/questionsModel";
import { feedbackDatas, interviewdatas } from "../types/interviewDatas";
import { GET_FEEDBACK_PROMPT } from "../constants/constantdata";
import OpenAI from "openai";
import Feedback from "../models/feedbackModel";

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
  const data = await InterviewData
  .findById(interviewID)
  .populate("questionList")
  .lean();

console.log(data, "check this data");

if (!data) {
 throw new httpError("Invalid interviewID",400)}

const { jobPosition, duration, questionList } = data;

const cleanData = questionList.map(({ question, type }:{question:string,type:string}) => ({
  question,
  type
}));

const responseData = {
  jobPosition,
  duration,
  questionList: cleanData
};

console.log(responseData, "responseData");

return responseData; 
}

export const getFeedback = async(body:feedbackDatas)=>{
const {interviewID,userName,allConversation}= body;
const conversationText = allConversation.map(item => `${item.role}:${item.content}`).join("\n");
  const FINAL_PROMPT = GET_FEEDBACK_PROMPT.replace(
    "{{conversation}}",
    conversationText,
  )
  const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPEN_ROUTER_API_KEY,
    defaultHeaders: {
      "HTTP-Referer": "http://localhost:3000", // change when deploying
      "X-Title": "AI Interview App",
    },
  });

  async function main() {
  try {
    const completion = await openai.chat.completions.create({
    model: `${process.env.OPEN_ROUTER_MODEL}`,
      messages: [{ role: "user", content: FINAL_PROMPT }],
    });

    return completion.choices[0].message.content || "";
  } catch (error: any) {
    console.error("OpenAI Error:", error);
    console.log("check header :",error.headers)
    throw new httpError("OpenAI request failed", 500);
  }
}

  const rawContent =await main();
   const cleaned = rawContent
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  // save  all the data to feedback collection
  const feedback = await Feedback.create({
    interviewID,
    userName,
    allConversation,
    feedback: JSON.parse(cleaned)
  });
  if(!feedback){
    throw new httpError("Failed to save feedback",400)
  }
  return JSON.parse(cleaned);


}