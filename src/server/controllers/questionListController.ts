import { NewFormData } from "@/app/types/newInterivewFormpage";
import OpenAI from "openai";
import { GET_QUESTIONLIST_PROMPT } from "../constants/constantdata";
import { httpError } from "@/errors/http.erros";
export const fetchQuestionList = async (body: NewFormData) => {
  const { jobPosition, jobDescription, duration, interviewTypes } = body;
  const FINAL_PROMPT = GET_QUESTIONLIST_PROMPT.replace(
    "{{jobTitle}}",
    jobPosition,
  )
    .replace("{{jobDescription}}", jobDescription)
    .replace("{{duration}}", duration)
    .replace("{{type}}", interviewTypes.join(","));
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
      model: "google/gemma-3n-e4b-it:free",
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

  return JSON.parse(cleaned);
};
