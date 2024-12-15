import JWT from "jsonwebtoken";
import { NextResponse } from "next/server";

export default async function middleware(req) {
  console.log("hello middleware");
  try {
    const BearerToken = req.headers.get("authorization")?.split(" ")[1];

    if (!BearerToken) {
      return Response.json({ message: "token not found" }, { status: 401 });
    }
    const user = JWT.verify(BearerToken, process.env.JWT_SECRET);
    req.user = user;
    return NextResponse.next();
  } catch (error) {
    return Response.json({ message: error.message }, { status: 401 });
  }
}

export const config = {
  matcher: "/api/event/:path*",
}