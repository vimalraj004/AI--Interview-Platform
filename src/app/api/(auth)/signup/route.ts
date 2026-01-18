import { registerSchema } from "@/app/validators/loginAndRegvalidation";
import { dbConnect } from "@/server/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { registerUser } from "@/server/services/registerpage";
import { httpError } from "@/errors/http.erros";
export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    let body = await req.json();
    console.log(body, "body");

    const parsedData = registerSchema.safeParse(body);
    console.log(parsedData, "parsedData");

    if (!parsedData.success) {
      return NextResponse.json({
        status: 400,
        message: "validation Failed",
        errors: parsedData.error.flatten().fieldErrors,
      });
    }
    let payload = {
      email: parsedData.data?.email,
      password: parsedData.data?.password,
      confirmPassword: parsedData.data?.confirmPassword,
    };
    const user = await registerUser(payload);
    return NextResponse.json(
      {
        message: "Account Created",
        user,
      },
      { status: 201 },
    );
  } catch (error) {
    console.log(error);
    if (error instanceof httpError) {
    return NextResponse.json(
      { message: error.message },
      { status: error.statuscode } 
    );
    }
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
