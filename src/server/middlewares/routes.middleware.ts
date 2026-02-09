import { NextRequest, NextResponse } from "next/server";

export const routeMiddleware = async (req: NextRequest) => {
  try {
    const accessToken = req.cookies.get("accessToken")?.value;
    const refreshToken = req.cookies.get("refreshToken")?.value;
    if (!accessToken && !refreshToken) {
      return NextResponse.json({ message: "AccessDenied" }, { status: 401 });
    } else if (!accessToken && refreshToken) {
      const res = NextResponse.next();
      res.cookies.set("accessToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 120,
      });
      res.cookies.delete("refreshToken");
      return res;
    } else if (accessToken && !refreshToken) {
      return NextResponse.next();
    } else {
      return NextResponse.next();
    }
  } catch (error) {
    return NextResponse.json({message:"UnAuthorized User"},{status:401})
  }
};
