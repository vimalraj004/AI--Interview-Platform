"use client";
import { useGlobalStore } from "@/app/Hooks/useGlobalStore";
import Image from "next/image";
import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  ArrowLeft,
  Briefcase,
  Clock,
  Copy,
  List,
  Mail,
  Plus,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
interface InterviewLinkProps {
  interviewLinkId: string;
}
const InterviewLink = ({ interviewLinkId }: InterviewLinkProps) => {
  const url =
    process.env.NEXT_PUBLIC_BASE_URL +
    "/" +
    "interview" +
    "/" +
    interviewLinkId;
  const formData = useGlobalStore();
  const { jobPosition, jobDescription, duration, interviewTypes } = formData;
  console.log(
    jobPosition,
    jobDescription,
    duration,
    interviewTypes,
    "check these data",
  );
  const navigate = useRouter();
  const onCopyLink =async()=>{
    await navigator.clipboard.writeText(url);
    toast.success("Link copied")
  }
return (
  <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] p-4 sm:p-6 lg:p-10 rounded-lg">
    <div className="max-w-4xl mx-auto"> 

      {/* Top Success Section */}
      <div className="flex flex-col items-center text-center gap-3 mb-8">
        <div className="bg-green-500/20 p-4 rounded-full">
          <Image src={"/5610944.png"} alt="tickicon" width={40} height={40} />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white">
          Your AI Interview is Ready!
        </h2>
        <p className="text-gray-300 text-sm sm:text-base max-w-md">
          Share this link with your candidates to start the interview process
        </p>
      </div>

      {/* Interview Link Card */}
      <div className="bg-white rounded-2xl shadow-xl p-5 sm:p-8 space-y-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h2 className="font-semibold text-lg">Interview Link</h2>
          <span className="bg-blue-100 text-blue-600 text-xs sm:text-sm px-3 py-1 rounded-full w-fit">
            Valid for 30 Days
          </span>
        </div>

        {/* Link Section */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            value={url}
            disabled
            className="truncate text-sm"
          />
          <Button
            onClick={onCopyLink}
            className="flex items-center gap-2 w-full sm:w-auto"
          >
            <Copy size={16} />
            Copy Link
          </Button>
        </div>

        {/* Interview Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-600 pt-4 border-t">

          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <Clock className="h-4 w-4" />
            <span>{duration}</span>
          </div>

          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <List className="h-4 w-4" />
            <span>{interviewTypes}</span>
          </div>

          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <Briefcase className="h-4 w-4" />
            <span>{jobPosition}</span>
          </div>

        </div>
      </div>

      {/* Share Via */}
      <div className="bg-white rounded-2xl shadow-xl p-5 sm:p-8 mt-6 space-y-5">
        <h2 className="font-semibold text-lg">Share Via</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Button variant="outline" className="w-full flex items-center gap-2 justify-center">
            <Mail size={18} />
            Email
          </Button>

          <Button variant="outline" className="w-full flex items-center gap-2 justify-center">
            <FaWhatsapp size={18} className="text-green-500" />
            Whatsapp
          </Button>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="bg-white rounded-2xl shadow-xl p-5 sm:p-8 mt-6 flex flex-col sm:flex-row gap-4 sm:justify-between">

        <Button
          className="flex items-center gap-2 w-full sm:w-auto"
          variant="secondary"
          onClick={() => navigate.push("/dashboard")}
        >
          <ArrowLeft size={16} />
          Back To Dashboard
        </Button>

        <Button
          className="flex items-center gap-2 w-full sm:w-auto"
          onClick={() => navigate.push("/dashboard/createInterview")}
        >
          <Plus size={16} />
          Create New Interview
        </Button>

      </div>

      <ToastContainer />
    </div>
  </div>
);

};

export default InterviewLink;
