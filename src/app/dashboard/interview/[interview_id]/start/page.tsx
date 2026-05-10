"use client";

import { useInterviewData } from "@/app/context/interviewDataContext";
import { Mic, PhoneOff, Video, Timer, VideoOff, MicOff } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Vapi from "@vapi-ai/web";
import { feedbackDatasResponse, questionListRespone } from "@/app/types/interviewPage";
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
import { ToastContainer, toast } from "react-toastify";
import {
  conversationItem,
  isConversationUpdateMessage,
  vapiMessageEvent,
} from "@/app/types/interviewStartPage";
import ConversationContainer from "@/app/components/pages/ConversationContainer";
import { commonService } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";
const StartInterview = () => {
  let navigate = useRouter();
  const { interviewData } = useInterviewData();
  const { interview_id } = useParams();
  const vapiRef = useRef<Vapi | null>(null);
  const hasStartedRef = useRef(false);
  const [activeUser, setActiveUser] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const timeRef = useRef<NodeJS.Timeout | null>(null);
  const [allConversation, setAllConversation] = useState<conversationItem[]>(
    [],
  );
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [cameraOn, setCameraOn] = useState(false);
  const [micOn, setMicOn] = useState(false);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const startMedia = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCameraOn(true);
      setMicOn(true);
    } catch (error) {
      console.log("permission denied:", error);
      toast.error("Permission denied for camera/mic");
    }
  };
  useEffect(() => {
    startMedia();
  }, []);
  useEffect(() => {
    if (videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
    }
  }, [cameraOn]);
  const handleError = (err: any) => {
  };
  const handleCallStart = () => {
    toast.success("Call Connected");
    setElapsedTime(0);
    const durationInMinutes = Number(interviewData.duration) || 0;
    const durationInSeconds = durationInMinutes * 60;

    timeRef.current = setInterval(() => {
      setElapsedTime((prev) => {
        const newTime = prev + 1;

        // show warning 1 minute beofore end
        if (newTime === durationInSeconds - 60) {
          toast.warn("Only 1 Minute Left");
        }
        // stop when time is up
        if (newTime >= durationInSeconds) {
          toast.error("Time is Up! Ending Interview");
          vapiRef.current?.stop();
          if (timeRef.current) {
            clearInterval(timeRef.current);
          }
        }
        return newTime;
      });
    }, 1000);
  };
  const handleSpeechStart = () => {
    setActiveUser(false);
  };
  const handleSpeechEnd = () => {
    setActiveUser(true);
  };
  const handleCallEnd = async () => {
    toast.error("Interview Stoped");
    if (timeRef.current) {
      clearInterval(timeRef.current);
    }
    // await getFeedBack();
  };
  const handleMessage = (message: vapiMessageEvent) => {
    if (!isConversationUpdateMessage(message)) return;
    if (
      message.type === "conversation-update" &&
      Array.isArray(message.conversation)
    ) {
      setAllConversation(message.conversation);
    }
  };
  const handleMic = () => {
    if (!streamRef.current) return;
    streamRef.current.getAudioTracks().forEach((track) => {
      track.enabled = !micOn;
    });
    setMicOn(!micOn);
  };
  const handleCamera = () => {
    if (!streamRef.current) return;
    streamRef.current.getVideoTracks().forEach((track) => {
      track.enabled = !cameraOn;
    });
    setCameraOn(!cameraOn);
  };
  const handlestop = async () => {
    vapiRef.current?.stop();
    streamRef.current?.getTracks().forEach((track) => track.stop());
    setElapsedTime(0);
    if (timeRef.current) {
      clearInterval(timeRef.current);
    }
    await getFeedBack();
  };
  useEffect(() => {
    if (!vapiRef.current) {
      vapiRef.current = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY!);

      vapiRef.current.on("error", handleError);
      vapiRef.current.on("call-start", handleCallStart);
      vapiRef.current.on("speech-start", handleSpeechStart);
      vapiRef.current.on("speech-end", handleSpeechEnd);
      vapiRef.current.on("call-end", handleCallEnd);
      vapiRef.current.on("message", handleMessage);
    }

    if (interviewData && !hasStartedRef.current) {
      hasStartedRef.current = true;
      startCall();
    }

    return () => {
      if (vapiRef.current) {
        vapiRef.current.off("error", handleError);
        vapiRef.current.off("call-start", handleCallStart);
        vapiRef.current.off("speech-start", handleSpeechStart);
        vapiRef.current.off("speech-end", handleSpeechEnd);
        vapiRef.current.off("call-end", handleCallEnd);
        vapiRef.current.off("message", handleMessage);
      }
    };
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

  const getFeedBack = async () => {
    try {
      let payload = {
        userName: interviewData?.userName,
        interviewID: interview_id,
        allConversation
      };
      const result = await commonService<feedbackDatasResponse>(
        "/api/interviewFeedback",
        "POST",
        payload,
      );
      if(result.status === 200){
        toast.success("Feedback Submitted");
        setTimeout(()=>{
                  navigate.push(`/dashboard/interview/${interview_id}/completed`);
        },500)
      } else{
        toast.error("Failed to submit feedback");
      }
    } catch (error) {
      console.log(error, "feedback error");
      toast.error("Failed to submit feedback");
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
          <span>{formatTime(elapsedTime)}</span>
        </div>
      </div>

      {/* Main Video Section */}
      <div className="flex-1 flex flex-col lg:flex-row p-4 md:p-6 gap-4">
        {/* Video Section */}
        <div className="flex-1 flex items-center justify-center relative">
          <div className="flex flex-col items-center relative">
            {/* Glow Ring */}
            {!activeUser && (
              <div className="absolute -z-10 w-[170px] h-[170px] rounded-full animate-ping bg-blue-400/30 blur-2xl"></div>
            )}

            {/* AI Avatar */}
            <div
              className={`
    p-1 rounded-full bg-blue-500/20 relative
    ${!activeUser ? "shadow-[0_0_40px_rgba(96,165,250,0.8)]" : ""}
    `}
            >
              <Image
                src="/ai-generated-female-journalist-holding-microphone-transparent-background-ai-png.webp"
                alt="AI Interviewer"
                width={140}
                height={140}
                className={`
      rounded-full border-4 border-blue-400
      transition-all duration-300
      ${!activeUser ? "animate-pulse scale-105" : ""}
      `}
              />
            </div>

            <p className="mt-4 text-lg md:text-xl font-medium text-blue-200">
              AI Interviewer
            </p>
          </div>

          {/* Floating User Panel */}
          <div
            className="absolute bottom-6 right-6 
  w-28 h-36 md:w-40 md:h-48 
  bg-white/5 
  backdrop-blur-xl 
  border border-white/10 
  rounded-2xl 
  shadow-xl 
  flex flex-col items-center justify-center"
          >
            {/* CAMERA ON → SHOW VIDEO */}
            {cameraOn ? (
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className={`rounded-full w-[70px] h-[70px] object-cover border-2 border-blue-300
      ${activeUser ? "animate-pulse shadow-[0_0_12px_rgba(147,197,253,0.9)]" : ""}`}
              />
            ) : (
              /* CAMERA OFF → SHOW IMAGE */
              <Image
                src="/ai-generated-female-journalist-holding-microphone-transparent-background-ai-png.webp"
                alt="User"
                width={70}
                height={70}
                className={`rounded-full border-2 border-blue-300
      ${activeUser ? "animate-pulse shadow-[0_0_12px_rgba(147,197,253,0.9)]" : ""}`}
              />
            )}

            <p className="text-xs md:text-sm mt-2 text-blue-200">
              {interviewData?.userName || "You"}
            </p>
          </div>
        </div>

        {/* Conversation Panel */}
        <div className="w-full lg:w-[380px] xl:w-[420px]">
          <ConversationContainer allConversation={allConversation} />
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
            {micOn ? (
              <Mic className="text-blue-200" onClick={handleMic} />
            ) : (
              <MicOff className="text-blue-200" onClick={handleMic} />
            )}
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
                  <AlertDialogAction
                    onClick={() => {
                      handlestop();
                    }}
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </button>

          <button className="p-4 rounded-full bg-blue-500/20 hover:bg-blue-500/30 transition">
            {cameraOn ? (
              <Video className="text-blue-200" onClick={handleCamera} />
            ) : (
              <VideoOff className="text-blue-200" onClick={handleCamera} />
            )}
          </button>
        </div>

        <p className="text-blue-200 text-sm mt-4">Interview in progress....</p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default StartInterview;
