"use client";

import { useInterviewData } from "@/app/context/interviewDataContext";
import { Mic, PhoneOff, Video, Timer } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Vapi from "@vapi-ai/web";
import { questionListRespone } from "@/app/types/interviewPage";
import { CreateAssistantDTO } from "@vapi-ai/web/dist/api";
import { AlertDialog } from "@radix-ui/react-alert-dialog";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const StartInterview = () => {
  const { interviewData } = useInterviewData();
  console.log(interviewData, "interviewData");
const vapiRef = useRef<Vapi | null>(null);
const hasStartedRef = useRef(false);
const [activeUser,setActiveUser] = useState(false)

useEffect(() => {
  if (!vapiRef.current) {
    vapiRef.current = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY!);

    vapiRef.current.on("error", (err) => {
      console.log("Vapi error:", err);
    });

    vapiRef.current.on("call-start",()=>{
      console.log("call has started")
    })
    vapiRef.current.on("speech-start",()=>{
      console.log("Assistant speech has started")
      setActiveUser(false);
    })
    vapiRef.current.on("speech-end",()=>{
      console.log("Assistant speech has ended ")
      setActiveUser(true);
    })

    vapiRef.current.on("call-end", () => {
      console.log("Call ended properly");
    });
  }

  if (interviewData && !hasStartedRef.current) {
    hasStartedRef.current = true;
   startCall();
  }

}, [interviewData]);

  const combineAllQuestionsIntoString = (
    questionList: questionListRespone[],
  ) => {
    let allquestionsAsString = "";
    for (let item of questionList) {
      allquestionsAsString += item.question + ",";
    }
    return allquestionsAsString;
  };
  const startCall = async () => {
    if (interviewData) {
      const allQuestions = combineAllQuestionsIntoString(
        interviewData.questionList,
      );
      console.log(allQuestions, "allQuestions");
      const assistantOptions: CreateAssistantDTO = {
        name: "AI Recruiter",
        firstMessage: `Hi ${interviewData.userName}, how are you? Ready for your interview on ${interviewData.jobPosition}?`,
        // transcriber: {
        //   provider: "deepgram",
        //   model: "nova-2",
        //   language: "en-US",
        // },
        // voice: {
        //   provider: "playht",
        //   voiceId: "jennifer",
        // },
        model: {
          provider: "openai",
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content: `
You are an AI voice assistant conducting interviews.
Your job is to ask candidates provided interview questions, assess their responses.
Begin the conversation with a friendly introduction, setting a relaxed yet professional tone. Example:
"Hey there! Welcome to your {{jobPosition}} interview. Let’s get started with a few questions!"
Ask one question at a time and wait for the candidate’s response before proceeding. Keep the questions clear and concise. Below are the questions ask one by one:
Questions: ${allQuestions}
If the candidate struggles, offer hints or rephrase the question without giving away the answer. Example:
"Need a hint? Think about how React tracks component updates!"
Provide brief, encouraging feedback after each answer. Example:
"Nice! That’s a solid answer."
"Hmm, not quite! Want to try again?"
Keep the conversation natural and engaging—use casual phrases like "Alright, next up..." or "Let’s tackle a tricky one!"
After 5-7 questions, wrap up the interview smoothly by summarizing their performance. Example:
"That was great! You handled some tough questions well. Keep sharpening your skills!"
End on a positive note:
"Thanks for chatting! Hope to see you crushing projects soon!"
Key Guidelines:
Be friendly, engaging, and witty 
Keep responses short and natural, like a real conversation
Adapt based on the candidate’s confidence level
Ensure the interview remains focused on React
`.trim(),
            },
          ],
        },
      };
      await vapiRef.current?.start(assistantOptions);
    }
  };
  return (
    <div className="min-h-screen w-full bg-auth-gradient text-white flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center px-4 md:px-8 py-4 border-b border-white/10 backdrop-blur-md">
        <h2 className="text-lg md:text-2xl font-semibold tracking-wide">
          AI Interview Session
        </h2>

        <div className="flex items-center gap-2 text-sm md:text-base text-blue-300">
          <Timer size={18} />
          <span>00:00:00</span>
        </div>
      </div>

      {/* Main Video Section */}
      <div className="flex-1 flex items-center justify-center p-4 md:p-8 relative">
        {/* Glass Main Panel */}
        <div
          className="w-full max-w-6xl h-[55vh] md:h-[70vh] 
                        bg-white/5 
                        backdrop-blur-2xl 
                        border border-white/10 
                        rounded-3xl 
                        shadow-2xl 
                        flex items-center justify-center relative"
        >
          <div className="flex flex-col items-center">
            <div className="p-1 rounded-full bg-blue-500/20">
              <Image
                src="/ai-generated-female-journalist-holding-microphone-transparent-background-ai-png.webp"
                alt="AI Interviewer"
                width={140}
                height={140}
                className="rounded-full border-4 border-blue-400 shadow-lg"
              />
            </div>

            <p className="mt-4 text-lg md:text-xl font-medium text-blue-200">
              AI Interviewer
            </p>
          </div>
        </div>

        {/* Floating User Panel */}
        <div
          className="absolute bottom-6 right-6 
                        w-28 h-36 md:w-44 md:h-52 
                        bg-white/5 
                        backdrop-blur-xl 
                        border border-white/10 
                        rounded-2xl 
                        shadow-xl 
                        flex flex-col items-center justify-center"
        >
          <Image
            src="/ai-generated-female-journalist-holding-microphone-transparent-background-ai-png.webp"
            alt="User"
            width={70}
            height={70}
            className="rounded-full border-2 border-blue-300"
          />

          <p className="text-xs md:text-sm mt-2 text-blue-200">
            {interviewData?.userName || "You"}
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center pb-6">
        <div
          className="flex justify-center items-center gap-6 
                        bg-white/5 
                        backdrop-blur-xl 
                        px-8 py-4 
                        rounded-full 
                        border border-white/10 
                        shadow-xl"
        >
          <button className="p-4 rounded-full bg-blue-500/20 hover:bg-blue-500/30 transition">
            <Mic className="text-blue-200" />
          </button>

          <button className="p-5 rounded-full bg-red-600 hover:bg-red-500 transition shadow-lg">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <PhoneOff />
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    You Want To Stop the Meeting
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => vapiRef.current?.stop()}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </button>

          <button className="p-4 rounded-full bg-blue-500/20 hover:bg-blue-500/30 transition">
            <Video className="text-blue-200" />
          </button>
        </div>

        <p className="text-blue-200 text-sm mt-4">Interview in progress....</p>
      </div>
    </div>
  );
};

export default StartInterview;
