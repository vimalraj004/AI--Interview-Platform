import { httpError } from "@/errors/http.erros";
import { dbConnect } from "@/server/lib/db";
import { routeMiddleware } from "@/server/middlewares/routes.middleware";
import { questionListService } from "@/server/services/questoinListPage";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // const middleware = await routeMiddleware(req);
    // if(middleware) return middleware
    await dbConnect();
    let body = await req.json();
    console.log(body, "body");
    const result = await questionListService(body)
    console.log(result,"result")
  } catch (error) {
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
