"use client";
import { FileSearch, Phone, Video } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const CreateOptions = () => {
  const router = useRouter();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
      {/* video Interview */}
      <div
        className="
          bg-white rounded-xl p-4
          flex items-start gap-4
          cursor-pointer
          transition-all duration-200
          hover:shadow-lg hover:-translate-y-1
        "
      >
        <div className="h-11 w-11 flex items-center justify-center rounded-lg bg-blue-100 text-blue-500 p-1">
          <Video className="h-5 w-5" />
        </div>

        <div onClick={() => router.push("/dashboard/createInterview")}>
          <h2 className="font-semibold font-mono text-sm sm:text-base">
            Create New Interview
          </h2>
          <p className="text-gray-500 font-mono text-xs sm:text-sm mt-1">
            Create AI interviews and schedule them with candidates
          </p>
        </div>
      </div>

      {/* Phone Screening */}
      <div
        className="
    bg-white rounded-xl p-4
    flex items-start gap-4
    cursor-pointer
    transition-all duration-200
    hover:shadow-lg hover:-translate-y-1
  "
      >
        <div className="h-11 w-11 flex items-center justify-center rounded-lg bg-green-100 text-green-500 p-1">
          <FileSearch className="h-5 w-5" />
        </div>

        <div onClick={()=>router.push("/dashboard/resumeAnalyzer")}>
          <h2 className="font-semibold font-mono text-sm sm:text-base">
            Resume Match Analyzer
          </h2>
          <p className="text-gray-500 font-mono text-xs sm:text-sm mt-1">
            Upload your resume and compare it with job descriptions to get match
            score and improvements
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateOptions;
