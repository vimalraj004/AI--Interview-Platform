"use client";

import { Plus, Video } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const LatestInterviewList = () => {
  const [latestInterviewList, setLatestInterviewList] = useState([]);
  const router = useRouter()
  return (
    <div className="mt-6">
      {latestInterviewList.length === 0 && (
        <div
          className="
            rounded-xl
            border border-white/10
            bg-white/5 backdrop-blur-md
            px-6 py-12
            flex flex-col items-center gap-4
            text-center
          "
        >
          {/* Icon */}
          <div className="h-14 w-14 rounded-full bg-blue-500/15 flex items-center justify-center">
            <Video className="h-6 w-6 text-blue-400" />
          </div>

          {/* Title */}
          <h2 className="text-lg sm:text-xl font-semibold text-white font-mono">
            No interviews yet
          </h2>

          {/* Description */}
          <p className="text-sm sm:text-base text-gray-400 max-w-md font-mono">
            You haven’t created any interviews yet. Start by creating your first AI interview and begin evaluating candidates.
          </p>

          {/* CTA */}
          <Button className="mt-2 flex items-center gap-2" onClick={()=> router.push("/dashboard/createInterview")}>
            <Plus size={16} />
            Create your first interview
          </Button>
        </div>
      )}
    </div>
  );
};

export default LatestInterviewList;
