import ProgressBar from "./ProgressBar";

import { useEffect, useState } from "react";

import {
  FeedbackDetailsState,
  FetchFeedbackDetailsResponse,
} from "@/app/types/scheduledInterviewComponent";

import {
  ToastContainer,
  toast,
} from "react-toastify";

import {
  FETCH_FEEDBACK_DETAILS,
} from "@/graphql/query";

import { useQuery }
from "@apollo/client/react";

const FeedbackDetails = ({
  interview_id,
}: {
  interview_id: string;
}) => {

  const [
    interviewFeedback,
    setInterviewFeedback,
  ] =
    useState<FeedbackDetailsState | null>(
      null
    );

  const {
    data,
    loading,
    error,
  } =
    useQuery<FetchFeedbackDetailsResponse>(
      FETCH_FEEDBACK_DETAILS,
      {
        variables: {
          interviewId: interview_id,
        },

        skip: !interview_id,
      }
    );

  useEffect(() => {

    if (data?.fetchFeedbackDetails) {

      toast.success(
        "Feedback fetched"
      );

      setInterviewFeedback(
        data.fetchFeedbackDetails
      );

    }

  }, [data]);

  useEffect(() => {

    if (error) {

      toast.error(error.message);

    }

  }, [error]);

  const feedback =
    interviewFeedback?.feedback;

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!feedback) {
    return (
      <div className="p-6 text-center text-gray-500">
        Feedback not available
      </div>
    );
  }

  const {
    summery,
    Recommendation,
    RecommendationMsg,
  } = feedback;

  const {
    technicalSkills,
    communication,
    problemSolving,
    experience,
  } = feedback.rating;

  const avg =
    (
      technicalSkills +
      communication +
      problemSolving +
      experience
    ) / 4;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md space-y-6">

      <div className="flex justify-between items-center">

        <div>

          <h2 className="text-xl font-semibold">
            {
              interviewFeedback?.userName ||
              "Candidate"
            }
          </h2>

        </div>

        <div className="text-blue-600 font-bold text-lg">

          {avg.toFixed(1)}

          <span className="text-gray-400 text-sm">
            /10
          </span>

        </div>

      </div>

      <div>

        <h3 className="font-semibold mb-3">
          Skills Assessment
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <ProgressBar
            label="Technical Skills"
            value={technicalSkills}
          />

          <ProgressBar
            label="Communication"
            value={communication}
          />

          <ProgressBar
            label="Problem Solving"
            value={problemSolving}
          />

          <ProgressBar
            label="Experience"
            value={experience}
          />

        </div>

      </div>

      <div>

        <h3 className="font-semibold mb-2">
          Performance Summary
        </h3>

        <div className="bg-gray-100 p-4 rounded-lg text-sm text-gray-700">

          {summery}

        </div>

      </div>

      <div
        className={`p-4 rounded-lg flex justify-between items-center ${
          Recommendation === "Yes"
            ? "bg-green-100"
            : "bg-red-100"
        }`}
      >

        <div>

          <h4 className="font-semibold">

            {Recommendation === "Yes"
              ? "Recommended for Hire"
              : "Not Recommended"}

          </h4>

          <p className="text-sm text-gray-600">
            {RecommendationMsg}
          </p>

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