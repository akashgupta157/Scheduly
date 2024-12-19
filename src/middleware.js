import * as jose from "jose";

export default async function middleware(req) {
  console.log("hello middleware");
  try {
    const BearerToken = req.headers.get("authorization")?.split(" ")[1];
    if (!BearerToken) {
      return Response.json({ message: "token not found" }, { status: 401 });
    }
    const signature = new TextEncoder().encode(process.env.JWT_SECRET);
    await jose.jwtVerify(BearerToken, signature);
  } catch (error) {
    return Response.json({ message: error.message }, { status: 401 });
  }
}
export const config = {
  matcher: "/api/event/:path*",
};
