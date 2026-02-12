import { NewFormData } from "@/app/types/newInterivewFormpage";
import OpenAI from "openai";
import { GET_QUESTIONLIST_PROMPT } from "../constants/constantdata";
import { httpError } from "@/errors/http.erros";
export const fetchQuestionList = async (body: NewFormData) => {
  const { jobPosition, jobDescription, duration, interviewTypes } = body;

  const FINAL_PROMPT = GET_QUESTIONLIST_PROMPT
    .replace("{{jobTitle}}", jobPosition)
    .replace("{{jobDescription}}", jobDescription)
    .replace("{{duration}}", duration)
    .replace("{{type}}", interviewTypes.join(","));

  const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPEN_ROUTER_API_KEY,
    defaultHeaders: {
      "HTTP-Referer": "http://localhost:3000",
      "X-Title": "AI Interview App",
    },
  });

  const completion = await openai.chat.completions.create({
    model: "google/gemma-3-27b-it:free",
    messages: [{ role: "user", content: FINAL_PROMPT }],
  });

  if (!completion) {
    throw new httpError("Failed to get QuestionList", 400);
  }

  const rawContent = completion.choices[0].message.content || "";
console.log("Raw AI Content:", rawContent);
  const cleaned = rawContent
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(cleaned);
};

