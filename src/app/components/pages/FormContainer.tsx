"use client";

import React from "react";
import { Input } from "../ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { interviewTypes } from "@/server/constants/constantdata";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

const FormContainer = () => {
  return (
    <div className="bg-white rounded-xl p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto space-y-6">
      {/* Job Position */}
      <div className="space-y-2">
        <h2 className="font-mono font-semibold text-sm sm:text-base text-gray-800">
          Job Position
        </h2>
        <Input placeholder="Full Stack Developer" />
      </div>

      {/* Job Description */}
      <div className="space-y-2">
        <h2 className="font-mono font-semibold text-sm sm:text-base text-gray-800">
          Job Description
        </h2>
        <Textarea placeholder="Enter detailed job description" />
      </div>

      {/* Interview Duration */}
      <div className="space-y-2">
        <h2 className="font-mono font-semibold text-sm sm:text-base text-gray-800">
          Interview Duration
        </h2>
        <Select>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Select Duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10 Min</SelectItem>
            <SelectItem value="20">20 Min</SelectItem>
            <SelectItem value="30">30 Min</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Interview Types */}
      <div className="space-y-2">
        <h2 className="font-mono font-semibold text-sm sm:text-base text-gray-800">
          Interview Types
        </h2>

        <div className="flex flex-wrap gap-2 sm:gap-3">
          {interviewTypes.map((type) => (
            <div
              key={type.title}
              className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 
                         border border-gray-300 rounded-xl cursor-pointer
                         bg-gray-50 hover:bg-blue-50 hover:border-blue-400
                         transition-all duration-200"
            >
              <type.icon className="h-4 w-4" />
              <span className="text-sm font-medium">{type.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="flex justify-end pt-4">
        <Button className="w-full sm:w-auto gap-2">
          Generate Questions <ArrowRight size={16} />
        </Button>
      </div>
    </div>
  );
};

export default FormContainer;
