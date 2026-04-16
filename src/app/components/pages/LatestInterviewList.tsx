"use client";

import { Plus, Video } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { commonService } from "@/lib/utils";
import { useAuth } from "@/app/context/authContext";
import {
  LatestInterviewData,
  LatestInterviewResponse,
} from "@/app/types/latestInterviewPage";
import { ToastContainer, toast } from "react-toastify";
import ScheduledInterviewCard from "./ScheduledInterviewCard";

 type LatestInterviewListProps ={
  allInterviews?: boolean;
  scheduledInterviews?: boolean;
}

const LatestInterviewList = ({ allInterviews, scheduledInterviews }: LatestInterviewListProps) => {
  const { userData } = useAuth();
  console.log("User Data in all interview page:", userData);
  const [latestInterviewList, setLatestInterviewList] = useState<
    LatestInterviewData[]
  >([]);
  console.log("Latest Interview List:", latestInterviewList);
  const router = useRouter();
  const hasFetched = useRef(false);



  const fetchLatestInterviews = async (email: string) => {
    try {
      const response = await commonService<LatestInterviewResponse>(
        `/api/latestInterviews?email=${email}&allInterviews=${allInterviews}&scheduledInterviews=${scheduledInterviews}`,
        "GET"
      );

      setLatestInterviewList(response.data);

      if (response.status === 200) {
        toast.success("Latest interviews fetched successfully!");
      }
    } catch (error:any) {
      console.log(error);
      toast.error(error?.message || "Failed to fetch latest interviews");
    }
  };

  useEffect(() => {
    if (userData?.email && userData.email !== "" && !hasFetched.current) {
      fetchLatestInterviews(userData.email);
      hasFetched.current = true;
    }
  }, [userData]);

  return (
    <div className="mt-6">

      {latestInterviewList.length === 0 ? (
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
          <div className="h-14 w-14 rounded-full bg-blue-500/15 flex items-center justify-center">
            <Video className="h-6 w-6 text-blue-400" />
          </div>

          <h2 className="text-lg sm:text-xl font-semibold text-white font-mono">
            No interviews yet
          </h2>

          <p className="text-sm sm:text-base text-gray-400 max-w-md font-mono">
            You haven’t created any interviews yet.
          </p>

          <Button
            className="mt-2 flex items-center gap-2"
            onClick={() => router.push("/dashboard/createInterview")}
          >
            <Plus size={16} />
            Create your first interview
          </Button>
        </div>
      ) : (

        /* Responsive Grid */
        <div
          className="
          grid gap-6
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
          2xl:grid-cols-5
        "
        >
          {latestInterviewList.map((interview, index) => (
            <ScheduledInterviewCard key={index} interview={interview} scheduledInterviews={scheduledInterviews} />
          ))}
        </div>
      )}
      <ToastContainer/>
    </div>
  );
};

export default LatestInterviewList;