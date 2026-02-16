import { object, string, z } from "zod";

export const interviewdatas = z.object({
  jobPosition: z.string().min(1, "Job position is required"),

  jobDescription: z.string().max(100, "Job description is required"),

  duration: z.string().min(1, "Duration is required"),

  interviewTypes: z
    .array(z.string())
    .min(1, "At least one interview type is required"),

  questionList: z
    .array(
      z.object({
        question: z.string().min(1, "Question is required"),
        type:z.string().min(1,"Job type is required")
      })
    )
    .min(1, "At least one question is required"),
});

