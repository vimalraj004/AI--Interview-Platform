"use client";

import FormContainer from "@/app/components/pages/FormContainer";
import WelcomeContainer from "@/app/components/pages/WelcomeContainer";
import { ArrowLeft } from "lucide-react";
import { Progress } from "@/app/components/ui/progress";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import QuestionList from "@/app/components/pages/QuestionList";

const CreateInterviewPage = () => {
  const router = useRouter();
  const [step,setStep] = useState(1);
  console.log(step,"step")

  return (
    <div className="w-full">
      {/* Welcome */}
      <div className="mt-5">
        <WelcomeContainer />
      </div>

      {/* Main Content */}
      <div className="mt-4 px-4 sm:px-8 md:px-20 lg:px-36 xl:px-52">
        {/* Header */}
        <div className="flex items-center gap-3">
          <ArrowLeft
            className="text-white cursor-pointer hover:-translate-x-1 transition"
            onClick={() => router.back()}
          />
          <h2 className="font-mono font-semibold text-gray-100 text-base sm:text-lg lg:text-xl">
            Create New Interview
          </h2>
        </div>

        {/* Progress */}
        <div className="mt-4 space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Step {step} of 4 — Interview Basics</span>
            <span>{step * 25}%</span>
          </div>
          <Progress value={step * 25} />
        </div>

        {/* Form */}
        <div className="mt-6">
          {step === 1 ? (
            <FormContainer setStep={setStep} />
          ) : step === 2 ? (
            <QuestionList />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default CreateInterviewPage;
