"use client";

import WelcomeContainer from "@/app/components/pages/WelcomeContainer";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Briefcase, Clock, Info, Video } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { commonService } from "@/lib/utils";
import { useAuth } from "@/app/context/authContext";
import {
  fetchInterviewDataResponse,
  responseData,
} from "@/app/types/interviewPage";
import { nullable } from "zod";
import { Audio } from "react-loader-spinner";

export default function InterviewPage() {
  const navigate  = useRouter();
  const { interview_id } = useParams();
  const [loading, setLoading] = useState(false);
  const initialInterviewData = {
    // _id: "",
    jobPosition: "",
    duration: "",
    userName: "",
    // interviewTypes:[],
    questionList:[],
  };
  const [interviewData, setInterviewData] =
    useState<responseData>(initialInterviewData);
  const getInterviewData = async () => {
    try {
            setLoading(true);

      const result = await commonService<fetchInterviewDataResponse>(
        `/api/fetchInterviewData?interview_id=${interview_id}`,
        "GET",
      );
      console.log(result, "resultFromUIside");
      setInterviewData(result.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (interview_id) {
      getInterviewData();
    }
  }, [interview_id]);

  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInterviewData((prev) => ({
      ...prev,
      userName: value,
    }));
  };
  const startInterview = () => {
    try {
      navigate.push(`/dashboard/interview/`+`${interview_id}`+"/start")
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/20 blur-[120px] rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <WelcomeContainer />

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-10 backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Hero Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-8 p-8 md:p-14">
            {/* Left Image */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="hidden md:flex justify-center"
            >
              <Image
                src="/Cover6_1.png.webp"
                alt="AI Interview"
                width={260}
                height={260}
                className="object-contain drop-shadow-2xl"
              />
            </motion.div>

            {/* Center Content */}
            <div className="text-center space-y-5">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Image
                  src="/sidebarlogo.png"
                  width={200}
                  height={80}
                  alt="logo"
                  className="mx-auto"
                />
              </motion.div>

              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                AI-Powered Interview Platform
              </h1>

              <div className="flex justify-center items-center gap-6 text-sm sm:text-base text-gray-300">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-blue-400" />
                  {interviewData?.jobPosition}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-purple-400" />
                  {interviewData?.duration} Minutes
                </div>
              </div>
            </div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="hidden md:flex justify-center"
            >
              <Image
                src="/filter-out-qualified-candidates_48EVv.png"
                alt="Candidate"
                width={240}
                height={240}
                className="object-contain drop-shadow-2xl"
              />
            </motion.div>
          </div>

          {/* Form Section */}
          <div className="px-6 md:px-16 pb-12 space-y-8">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Enter Your Full Name
              </label>
              <Input
                placeholder="eg: John Cena"
                className="h-12 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500"
                onChange={(e) => {
                  handleOnchange(e);
                }}
              />
            </div>

            {/* Info Box */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-2xl p-6"
            >
              <Info className="text-blue-400 mt-1" />
              <div>
                <h3 className="font-semibold text-blue-300">
                  Before You Begin
                </h3>
                <ul className="text-sm text-gray-300 mt-3 space-y-2">
                  <li>• Test your camera and microphone</li>
                  <li>• Ensure stable internet connection</li>
                  <li>• Find a quiet place for interview</li>
                </ul>
              </div>
            </motion.div>

            {/* Button */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                className="w-full h-14 text-base font-semibold rounded-xl 
               bg-gradient-to-r from-blue-600 to-purple-600 
               hover:opacity-90 transition-all 
               flex items-center justify-center gap-2 shadow-lg"
                disabled={loading || !interviewData.userName}
                onClick={startInterview}
              >
                {loading ? (
                  <>
                    <Audio
                      height="24"
                      width="24"
                      color="#ffffff"
                      ariaLabel="audio-loading"
                      visible={true}
                    />
                    <span className="text-white">Loading...</span>
                  </>
                ) : (
                  <>
                    <Video className="w-5 h-5" />
                    <span>Start Interview</span>
                  </>
                )}
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
