import {Redis} from "@upstash/redis";

export const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// example of redis rate limiting in next js api route

// import { NextRequest } from "next/server";
// import { redis } from "@/lib/redis";

// export async function POST(req: NextRequest) {
//   // 1. Get user IP
//   const ip =
//     req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";

//   const key = `rate_limit:${ip}`;

//   // 2. Increment request count
//   const count = await redis.incr(key);

//   // 3. Set expiry for first request
//   if (count === 1) {
//     await redis.expire(key, 60); // 1 minute window
//   }

//   // 4. Block if limit exceeded
//   if (count > 5) {
//     return new Response("Too many requests", { status: 429 });
//   }

//   // 5. Your actual API logic
//   return Response.json({ message: "Success" });
// }

// example of redis implementation in next js api route


//  app/api/latestInterviews/route.ts
// import { redis } from "@/lib/redis";

// export async function GET() {
//   const cacheKey = "latest_interviews";

//   // 1. Check cache
//   const cached = await redis.get(cacheKey);

//   if (cached) {
//     return Response.json({
//       source: "cache",
//       data: cached,
//     });
//   }

//   // 2. Fetch from DB
//   const interviews = await getInterviewsFromDB();

//   // 3. Store in Redis (TTL 60 sec)
//   await redis.set(cacheKey, interviews, { ex: 60 });

//   return Response.json({
//     source: "db",
//     data: interviews,
//   });
// }