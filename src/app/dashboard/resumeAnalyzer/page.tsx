"use client";

import WelcomeContainer from "@/app/components/pages/WelcomeContainer";
import React, { useState } from "react";
import ResumeDropzone from "@/app/components/pages/ResumeDropzone";
import { commonService } from "@/lib/utils";
import { ToastContainer, toast } from "react-toastify";
import { ResumeAnalysisResponse } from "@/app/types/resumeAnalyzerPage";

export interface ResumeAnalysis {
  score: number;
  missingSkills: string[];
  suggestions: string[];
}

const ResumeAnalyzer = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (file: File) => {
    setResumeFile(file);
  };

  const analyzeResume = async () => {
    try {
      if (!jobDescription) {
        toast.error("Please enter the job description.");
        return;
      }

      if (!resumeFile) {
        toast.error("Please upload your resume.");
        return;
      }

      if (resumeFile.size > 2 * 1024 * 1024) {
        toast.error("File size exceeds 2MB.");
        return;
      }

      const formData = new FormData();
      formData.append("resume", resumeFile);
      formData.append("jobDescription", jobDescription);

      setLoading(true);

      const response =
        await commonService<ResumeAnalysisResponse>(
          "/api/uploadResume",
          "POST",
          formData,
          true
        );

      if (response?.status === 200 && response?.data) {
        setAnalysis(response.data);
        toast.success("Resume analyzed successfully!");
      } else {
        toast.error(response?.message || "Failed to analyze resume.");
      }
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const resetAnalysis = () => {
    setAnalysis(null);
    setResumeFile(null);
    setJobDescription("");
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-10 py-6">
      <div className="mt-5">
        <WelcomeContainer />
      </div>

      <div className="mt-8">

        {/* ================= INPUT SECTION ================= */}
        {!analysis && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              {/* JOB DESCRIPTION */}
              <div className="bg-[#0f172a] border border-gray-700 rounded-2xl p-5">
                <h2 className="text-sm text-purple-400 mb-3 font-semibold">
                  ● JOB DESCRIPTION
                </h2>

                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="w-full h-64 bg-transparent border border-gray-600 rounded-xl p-4 text-gray-300"
                />
              </div>

              {/* RESUME */}
              <div className="bg-[#0f172a] border border-gray-700 rounded-2xl p-5">
                <h2 className="text-sm text-purple-400 mb-3 font-semibold">
                  ● YOUR RESUME
                </h2>

                <ResumeDropzone onFileUpload={handleFileUpload} />
              </div>
            </div>

            {/* BUTTON */}
            <div className="mt-6">
              <button
                disabled={loading}
                onClick={analyzeResume}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold disabled:opacity-50"
              >
                {loading ? "Analyzing..." : "⚡ Analyze Resume"}
              </button>
            </div>
          </>
        )}

        {/* ================= RESULT SECTION ================= */}
        {analysis && (
          <div className="mt-8 space-y-6">

            {/* SCORE */}
            <div className="bg-[#0f172a] border border-gray-700 rounded-2xl p-6 text-center">
              <h3 className="text-gray-400 text-sm">MATCH SCORE</h3>
              <div className="text-5xl font-bold text-green-400">
                {analysis.score}%
              </div>
            </div>

            {/* GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              {/* SKILLS */}
              <div className="bg-[#0f172a] border border-gray-700 rounded-2xl p-6">
                <h3 className="text-purple-400 mb-4">Missing Skills</h3>

                <div className="flex flex-wrap gap-2">
                  {(analysis.missingSkills || []).map((skill, i) => (
                    <span key={i} className="px-3 py-1 text-xs bg-red-500/20 text-red-400 rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* SUGGESTIONS */}
              <div className="bg-[#0f172a] border border-gray-700 rounded-2xl p-6">
                <h3 className="text-indigo-400 mb-4">Suggestions</h3>

                <ul className="space-y-2">
                  {(analysis.suggestions || []).map((s, i) => (
                    <li key={i} className="text-gray-300 text-sm">
                      ✔ {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* RESET */}
            <button
              onClick={resetAnalysis}
              className="w-full py-3 rounded-xl bg-gray-700 text-white"
            >
              🔄 Analyze Another Resume
            </button>
          </div>
        )}

      </div>

      <ToastContainer />
    </div>
  );
};

export default ResumeAnalyzer;