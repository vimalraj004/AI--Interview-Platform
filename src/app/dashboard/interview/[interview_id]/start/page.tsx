"use client";

import { useInterviewData } from "@/app/context/interviewDataContext";
import { Mic, PhoneOff, Video, Timer } from "lucide-react";
import Image from "next/image";
import React from "react";

const StartInterview = () => {
  const { interviewData } = useInterviewData();

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
        <div className="w-full max-w-6xl h-[55vh] md:h-[70vh] 
                        bg-white/5 
                        backdrop-blur-2xl 
                        border border-white/10 
                        rounded-3xl 
                        shadow-2xl 
                        flex items-center justify-center relative">

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
        <div className="absolute bottom-6 right-6 
                        w-28 h-36 md:w-44 md:h-52 
                        bg-white/5 
                        backdrop-blur-xl 
                        border border-white/10 
                        rounded-2xl 
                        shadow-xl 
                        flex flex-col items-center justify-center">

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

        <div className="flex justify-center items-center gap-6 
                        bg-white/5 
                        backdrop-blur-xl 
                        px-8 py-4 
                        rounded-full 
                        border border-white/10 
                        shadow-xl">

          <button className="p-4 rounded-full bg-blue-500/20 hover:bg-blue-500/30 transition">
            <Mic className="text-blue-200" />
          </button>

          <button className="p-5 rounded-full bg-red-600 hover:bg-red-500 transition shadow-lg">
            <PhoneOff />
          </button>

          <button className="p-4 rounded-full bg-blue-500/20 hover:bg-blue-500/30 transition">
            <Video className="text-blue-200" />
          </button>
        </div>

        <p className="text-blue-200 text-sm mt-4">
          Interview in progress....
        </p>
      </div>
    </div>
  );
};

export default StartInterview;