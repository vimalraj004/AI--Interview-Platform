import { ArrowRight, Copy, Send, Video } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { ToastContainer, toast } from "react-toastify";
import { Feedback } from "@/app/types/scheduledInterviewComponent";

interface ScheduledInterviewCardProps {
  interview: {
    _id: string;
    jobPosition: string;
    jobDescription: string;
    duration: string;
    feedback: Feedback;
    createdAt: Date;
  };
  scheduledInterviews?: boolean;
}

const ScheduledInterviewCard = ({ interview,scheduledInterviews }: ScheduledInterviewCardProps) => {
  const url =
    `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/interview/` + interview._id;

  const copyLink = () => {
    navigator.clipboard.writeText(url);
    toast.success("Interview link copied to clipboard!");
  };

  const onSend = () => {
    window.location.href = `mailto:?subject=Invitation to AI Interview for ${interview.jobPosition}&body=Interview Link: ${url}`;
  };

  return (
    <div
      className="
      bg-white
      border
      rounded-xl
      p-5
      shadow-sm
      hover:shadow-md
      transition
      flex
      flex-col
      justify-between
      min-h-[170px]
    "
    >
      {/* top section */}
      <div className="flex items-center justify-between mb-3">
        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
          <Video className="h-5 w-5 text-blue-600" />
        </div>

        <p className="text-sm text-gray-500">
          {new Date(interview.createdAt).toLocaleDateString()}
        </p>
      </div>

      {/* title */}
      <h2 className="text-lg font-semibold text-gray-800">
        {interview.jobPosition}
      </h2>

      {/* duration */}
      <p className="text-sm text-gray-500 mb-4 flex justify-between">{interview.duration} Min
        {scheduledInterviews && (
          <span className="block text-xs text-gray-400">
            {interview?.feedback?.rating?.technicalSkills ? `Rating: ${interview?.feedback?.rating?.technicalSkills}/5` : "No feedback yet"}
          </span>
        )}
      </p>

      {/* buttons */}
      {!scheduledInterviews ?(
          <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={copyLink}
          className="flex-1 flex items-center gap-2"
        >
          <Copy size={16} />
          Copy Link
        </Button>

        <Button
          onClick={onSend}
          className="flex-1 flex items-center gap-2"
        >
          <Send size={16} />
          Send
        </Button>
      </div>
      ):(
        <div className="flex ">
        <Button
          onClick={onSend}
          className="flex-1 flex items-center gap-2"
        >
         View Details
         <ArrowRight size={16} />
        </Button>
      </div>

      )}

      <ToastContainer/>
    </div>
  );
};

export default ScheduledInterviewCard;