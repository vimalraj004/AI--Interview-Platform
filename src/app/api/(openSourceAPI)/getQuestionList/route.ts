import { httpError } from "@/errors/http.erros";
import { dbConnect } from "@/server/lib/db";
import { routeMiddleware } from "@/server/middlewares/routes.middleware";
import { questionListService } from "@/server/services/questoinListPage";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    let body = await req.json();
    const result = await questionListService(body)
    return NextResponse.json({message:"QuestionFetched",data:result},{status:200})
  } catch (error:any) {
    console.log(error,"error from question list route");
    if (error instanceof httpError) {
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: error.statuscode,
        },
      );
    }
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
