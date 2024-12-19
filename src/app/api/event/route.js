import dbConnect from "@/utils/dbConnection";
import eventModel from "@/models/event";
import { headers } from "next/headers";
import jwt from "jsonwebtoken";

export const POST = async (req) => {
  try {
    await dbConnect();
    const headersInstance = await headers();
    const token = headersInstance.get("authorization")?.split(" ")[1];
    if (!token) {
      return Response.json({ message: "Token not found", success: false });
    }
    const { userId } = jwt.decode(token);
    const event = await eventModel.create({
      userId,
      ...(await req.json()),
    });
    return Response.json({ event });
  } catch (error) {
    return Response.json({ message: error.message, success: false });
  }
};
export const GET = async (req) => {
  try {
    await dbConnect();
    const headersInstance = await headers();
    const token = headersInstance.get("authorization")?.split(" ")[1];
    if (!token) {
      return Response.json({ message: "Token not found", success: false });
    }
    const { userId } = jwt.decode(token);
    const events = await eventModel.find({ userId });
    return Response.json({ events });
  } catch (error) {
    return Response.json({ message: error.message, success: false });
  }
};
