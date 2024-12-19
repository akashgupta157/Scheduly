import dbConnect from "@/utils/dbConnection";
import eventModel from "@/models/event";
import { headers } from "next/headers";
import jwt from "jsonwebtoken";

export const DELETE = async (req, { params }) => {
  try {
    await dbConnect();
    const headersInstance = await headers();
    const token = headersInstance.get("authorization")?.split(" ")[1];
    if (!token) {
      return Response.json({ message: "Token not found", success: false });
    }
    const { userId } = jwt.decode(token);
    const event = await eventModel.findById(params.id);
    if (!event) {
      return Response.json({ message: "Event not found", success: false });
    }
    if (event.userId !== userId) {
      return Response.json({ message: "Unauthorized", success: false });
    }
    await eventModel.findByIdAndDelete(params.id);
    return Response.json({
      message: "Event deleted successfully",
      success: true,
    });
  } catch (error) {
    return Response.json({ message: error.message, success: false });
  }
};

export const PATCH = async (req, { params }) => {
  try {
    await dbConnect();
    const headersInstance = await headers();
    const token = headersInstance.get("authorization")?.split(" ")[1];
    if (!token) {
      return Response.json({ message: "Token not found", success: false });
    }
    const { userId } = jwt.decode(token);
    const { id } = await params;
    const event = await eventModel.findById(id);
    if (!event) {
      return Response.json({ message: "Event not found", success: false });
    }
    if (event.userId !== userId) {
      return Response.json({ message: "Unauthorized", success: false });
    }
    const updatedEvent = await eventModel.findByIdAndUpdate(
      id,
      await req.json(),
      { new: true }
    );
    return Response.json({
      event: updatedEvent,
      message: "Event updated successfully",
    });
  } catch (error) {
    return Response.json({ message: error.message, success: false });
  }
};
