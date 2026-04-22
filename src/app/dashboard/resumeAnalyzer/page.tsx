"use client";
import WelcomeContainer from "@/app/components/pages/WelcomeContainer";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud } from "lucide-react";
import ResumeDropzone from "@/app/components/pages/ResumeDropzone";
import { commonService } from "@/lib/utils";
import { ToastContainer, toast } from "react-toastify";


const ResumeAnalyzer = () => {

    const [jobDescription, setJobDescription] = React.useState("");
    const [resumeFile, setResumeFile] = React.useState<File | null>(null);
    const handleFileUpload = (file: File) => {
    console.log("Uploaded file:", file);
    setResumeFile(file);

  };
  const analyzeResume = async () => {
    try {
        
    const formData = new FormData();
    formData.append("resume", resumeFile as File);
    formData.append("jobDescription", jobDescription);

    if(!jobDescription){
        toast.error("Please enter the job description before uploading your resume.");
        return;
    }
    if(!resumeFile){
        toast.error("Please upload your resume file.");
        return;
    }
    if(resumeFile.size > 2 * 1024 * 1024){
        toast.error("File size exceeds 2MB limit. Please upload a smaller file.");
        return;
    }
    const response = await commonService("/api/uploadResume","POST",formData,true)
    console.log("Upload resume:", response);
        
    } catch (error) {
        toast.error("An error occurred while analyzing your resume.");
    }
  }

  return (
    <div className="w-full px-4 sm:px-6 lg:px-10 py-6">
      {/* Welcome */}
      <div className="mt-5">
        <WelcomeContainer />
      </div>

      {/* Main Content */}
      <div className="mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* LEFT - JOB DESCRIPTION */}
          <div className="bg-[#0f172a] border border-gray-700 rounded-2xl p-5">
            <h2 className="text-sm text-purple-400 mb-3 font-semibold tracking-wide">
              ● JOB DESCRIPTION
            </h2>

            <textarea
            onChange={(e) => setJobDescription(e.target.value)}
              placeholder={`Paste the job description here...

e.g. We're looking for a Senior React Developer with 5+ years experience in TypeScript, Node.js, AWS...`}
              className="
                w-full h-56 sm:h-64 lg:h-72
                bg-transparent
                border border-gray-600
                rounded-xl
                p-4
                text-sm text-gray-300
                placeholder:text-gray-500
                focus:outline-none focus:ring-2 focus:ring-purple-500
                resize-none
              "
            />
          </div>

          {/* RIGHT - RESUME UPLOAD */}
          <div className="bg-[#0f172a] border border-gray-700 rounded-2xl p-5">
            <h2 className="text-sm text-purple-400 mb-3 font-semibold tracking-wide">
              ● YOUR RESUME
            </h2>

            {/* DROPZONE */}
            <ResumeDropzone  onFileUpload={handleFileUpload}/>
            {/* OR TEXT AREA */}
            <textarea
              placeholder="Or paste your resume text directly here..."
              className="
                mt-4 w-full h-32
                bg-transparent
                border border-gray-600
                rounded-xl
                p-4
                text-sm text-gray-300
                placeholder:text-gray-500
                focus:outline-none focus:ring-2 focus:ring-purple-500
                resize-none
              "
            />
          </div>
        </div>

        {/* BUTTON */}
        <div className="mt-6">
          <button
            className="
              w-full py-4 rounded-xl
              bg-gradient-to-r from-purple-500 to-indigo-500
              text-white font-semibold
              hover:opacity-90 transition
            "
            onClick={()=>analyzeResume()}
          >
            ⚡ Analyze & Tailor Resume
          </button>
        </div>
      </div>
        <ToastContainer />
    </div>
  );
};

export default ResumeAnalyzer;
