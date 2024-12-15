import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  location: { type: String },
  color: { type: String },
  startTime: { type: String },
  endTime: { type: String },
});

export default mongoose.models.Event || mongoose.model("Event", eventSchema);
