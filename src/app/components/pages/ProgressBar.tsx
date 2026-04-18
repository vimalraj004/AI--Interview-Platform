import React from "react";

interface ProgressBarProps {
    label: string;
    value: number;
}

const ProgressBar = ({ label, value }: ProgressBarProps) => {
  return (
    <div className="w-full">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-600">{label}</span>
        <span className="text-gray-600">{value}/10</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full"
          style={{ width: `${value * 10}%` }}
        />
      </div>
    </div>
  );
};
export default ProgressBar;