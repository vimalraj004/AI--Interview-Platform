import React from "react";

const ProgressBar = ({ label, value }) => {
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

const FeedbackDetails = ({ interview }) => {
    console.log(interview,"interview")
  const feedback = interview?.feedback.feedback;

  if (!feedback) {
    return (
      <div className="p-6 text-center text-gray-500">
        Feedback not available
      </div>
    );
  }

  const {
    rating: { technicalSkills, communication, problemSolving, experience },
    summery,
    Recommendation,
    RecommendationMsg,
  } = feedback;

  const avg =
    (
      technicalSkills +
      communication +
      problemSolving +
      experience
    ) /
    4;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md space-y-6">
      
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">
            {interview?.userName || "Candidate"}
          </h2>
          <p className="text-sm text-gray-500">
            {interview?.jobPosition}
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
    </div>
  );
};

export default FeedbackDetails;