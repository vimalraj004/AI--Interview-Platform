import { useParams } from "next/navigation";
import ProgressBar from "./ProgressBar";
import { useEffect, useState } from "react";
import { commonService } from "@/lib/utils";
import { feedbackDetailsResponse } from "@/app/types/scheduledInterviewComponent";
import { ToastContainer, toast } from "react-toastify";

const FeedbackDetails = ({ interview_id }: { interview_id: string }) => {
  const [interviewFeedback, setInterviewFeedback] =
    useState<feedbackDetailsResponse | null>(null);
  const fetchFeedbackDetails = async (interviewId: string) => {
    try {
      const response = await commonService<feedbackDetailsResponse>(
        "/api/fetchFeedbackDetails?interviewId=" + interviewId,
        "GET",
      );
      console.log("Feedback details response:", response);
      // Handle the response and update state as needed
      if (response.status === 200) {
        toast.success("Feedback");
        setInterviewFeedback(response);
      } else {
        toast.error(response.message || "Failed to fetch feedback details");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (interview_id && typeof interview_id === "string") {
      fetchFeedbackDetails(interview_id);
    }
  }, [interview_id]);
  const feedback = interviewFeedback?.feedbackDetails?.feedback;
  console.log("feedback:", feedback);

  if (!feedback) {
    return (
      <div className="p-6 text-center text-gray-500">
        Feedback not available
      </div>
    );
  }

  const { summery, Recommendation, RecommendationMsg } = feedback;
  const { technicalSkills, communication, problemSolving, experience } =feedback.rating;
  const avg =
    (technicalSkills + communication + problemSolving + experience) / 4;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">
            {interviewFeedback?.feedbackDetails.userName || "Candidate"}
          </h2>
          <p className="text-sm text-gray-500">
            {/* {interviewFeedback?.feedback.feedback.jobPosition} */}
          </p>
        </div>
        <div className="text-blue-600 font-bold text-lg">
          {avg.toFixed(1)} <span className="text-gray-400 text-sm">/10</span>
        </div>
      </div>

      {/* Skills */}
      <div>
        <h3 className="font-semibold mb-3">Skills Assessment</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ProgressBar label="Technical Skills" value={technicalSkills} />
          <ProgressBar label="Communication" value={communication} />
          <ProgressBar label="Problem Solving" value={problemSolving} />
          <ProgressBar label="Experience" value={experience} />
        </div>
      </div>

      {/* Summary */}
      <div>
        <h3 className="font-semibold mb-2">Performance Summary</h3>
        <div className="bg-gray-100 p-4 rounded-lg text-sm text-gray-700">
          {summery}
        </div>
      </div>

      {/* Recommendation */}
      <div
        className={`p-4 rounded-lg flex justify-between items-center ${
          Recommendation === "Yes" ? "bg-green-100" : "bg-red-100"
        }`}
      >
        <div>
          <h4 className="font-semibold">
            {Recommendation === "Yes"
              ? "Recommended for Hire"
              : "Not Recommended"}
          </h4>
          <p className="text-sm text-gray-600">{RecommendationMsg}</p>
        </div>

        {Recommendation === "Yes" && (
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg">
            Proceed to Offer
          </button>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default FeedbackDetails;
