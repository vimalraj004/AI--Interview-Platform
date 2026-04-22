import { httpError } from "@/errors/http.erros";
import { RESUME_ANALYZER_PROMPT } from "../constants/constantdata";
import OpenAI from "openai";

export const resumeController = async (extractedFileString:string,jobDescription:string)=>{
  const FINAL_PROMPT = RESUME_ANALYZER_PROMPT.replace(
    "{jobDescription}",
    jobDescription
  ).replace(
    "{resumeText}",
    extractedFileString
  );
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
  
    let parsed;
  
    try {
      parsed = JSON.parse(cleaned);
    } catch (err) {
      console.error("JSON Parse Error:", cleaned);
      throw new httpError("Invalid JSON response from AI", 500);
    }
  
    if (
      !parsed ||
      !Array.isArray(parsed.interviewQuestions) ||
      parsed.interviewQuestions.length === 0
    ) {
      throw new httpError("Invalid AI response format", 500);
    }
  
    return parsed;
}