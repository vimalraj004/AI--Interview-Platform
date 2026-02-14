import { registerSchema } from "@/app/validators/loginAndRegvalidation";
import { dbConnect } from "@/server/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { registerUser } from "@/server/services/registerpage";
import { httpError } from "@/errors/http.erros";
import { createTokens } from "@/server/lib/jwt";
export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    let body = await req.json();

    const parsedData = registerSchema.safeParse(body);

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
    const tokensCreated = await createTokens(user);
    const response = NextResponse.json(
      { message: "Account Created" },
      { status: 201 },
    );
    response.cookies.set("accessToken", tokensCreated.accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 3600,
    });
    response.cookies.set("refreshToken", tokensCreated.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7200,
    });
    return response;
  } catch (error) {
    console.log(error);
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
