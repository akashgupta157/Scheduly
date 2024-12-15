import mongoose from "mongoose";
export default async function dbConnect() {
  try {
    mongoose.connect(process.env.MONGODB_URI);
    console.log("Database connected");
  } catch (error) {
    console.log(error);
  }
}
