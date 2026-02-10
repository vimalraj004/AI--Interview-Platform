import { NewFormData } from "@/app/types/newInterivewFormpage";
import OpenAI from "openai";
import { GET_QUESTIONLIST_PROMPT } from "../constants/constantdata";
import { httpError } from "@/errors/http.erros";
export const fetchQuestionList = async (body: NewFormData) => {
    const {jobPosition,jobDescription,duration,interviewTypes}=body
    const FINAL_PROMPT = GET_QUESTIONLIST_PROMPT
    .replace("{{jobTitle}}",jobPosition)
    .replace("{{jobDescription}}",jobDescription)
    .replace("{{duration}}",duration)
    .replace("{{type}}",interviewTypes.join(","))
    const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPEN_ROUTER_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: "meta-llama/llama-3.3-70b-instruct:free",
      messages: [{ role: "user", content: FINAL_PROMPT }],
    });
    console.log(completion,"completion")
    console.log(completion.choices[0].message);
    if(!completion){
        throw new httpError("Failed to get QuestionList",400)
    }
    return  completion.choices[0].message
};
