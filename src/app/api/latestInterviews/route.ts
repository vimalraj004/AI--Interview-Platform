import { httpError } from "@/errors/http.erros";
import { dbConnect } from "@/server/lib/db";
import InterviewData from "@/server/models/interviewModel";
import { NextRequest, NextResponse } from "next/server";
import "@/server/models/feedbackModel";
import { redis } from "@/lib/redis";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    await dbConnect();
    const email = req.nextUrl.searchParams.get("email");
    const allInterviewsParam = req.nextUrl.searchParams.get("allInterviews");
    const scheduledInterviewsParam = req.nextUrl.searchParams.get(
      "scheduledInterviews",
    );

    // for redis
    const ip = req.headers.get("x-forwarded-for");
    const rateLimitKey = `rate_limit:${ip}`;
    const cacheKey = "latest_interviews";

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 },
      );
    }
    let latestInterviews;
    if (allInterviewsParam === "true") {
      latestInterviews = await InterviewData.find({ userEmail: email })
        .sort({ createdAt: -1 })
        .select("-__v -updatedAt -interviewTypes -feedback");
    } else if (scheduledInterviewsParam === "true") {
      latestInterviews = await InterviewData.find({ userEmail: email })
        .sort({ createdAt: -1 })
        .populate("feedback")
        .select("-__v -updatedAt -interviewTypes ");
    } else {
      //  RATE LIMIT (max 10 requests per minute)
      const current = await redis.incr(rateLimitKey);

      if (current === 1) {
        // set expiry only when first request comes
        await redis.expire(rateLimitKey, 60); // 60 sec window
      }

      if (current > 10) {
        return NextResponse.json(
          {
            message: "Too many requests. Please try again later.",
          },
          { status: 429 },
        );
      }
      // CHECK CACHE
      const cachedData = await redis.get(cacheKey);

      if (cachedData) {
        console.log("✅ Cache HIT");
        return NextResponse.json(
          {
            message: "Successfully Fetched The Latest Interviews",
            data: cachedData,
          },
          { status: 200 },
        );
      }

      console.log("❌ Cache MISS");

      latestInterviews = await InterviewData.find({ userEmail: email })
        .sort({ createdAt: -1 })
        .limit(6)
        .select("-__v -updatedAt -interviewTypes -feedback");
      console.log("latestInterviews for dashboard:", latestInterviews);
      // . STORE IN CACHE
      await redis.set(cacheKey, latestInterviews, { ex: 300 });
    }
    if (latestInterviews.length === 0) {
      return NextResponse.json(
        { message: "No interviews found for this user" },
        { status: 404 },
      );
    }
    return NextResponse.json(
      {
        message: "Successfully Fetched The Latest Interviews",
        data: latestInterviews,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    if (error instanceof httpError) {
      return NextResponse.json(
        { message: error.message },
        { status: error.statuscode },
      );
    }
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
