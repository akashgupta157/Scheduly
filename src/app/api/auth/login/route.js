import dbConnect from "@/utils/dbConnection";
import userModel from "@/models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const POST = async (req) => {
  try {
    await dbConnect();
    const { email, password } = await req.json();
    const user = await userModel.findOne({ email });
    if (!user) {
      return Response.json({ message: "Email not found", success: false });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return Response.json({
        message: "Incorrect Password",
        success: false,
      });
    }
    const token = jwt.sign(
      { userId: user._id, user: user.email },
      process.env.JWT_SECRET
    );
    return Response.json({
      success: true,
      token,
      ...user._doc,
      message: "Login successful",
    });
  } catch (error) {
    return Response.json({ message: error.message, success: false });
  }
};
