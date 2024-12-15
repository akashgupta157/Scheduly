import dbConnect from "@/utils/dbConnection";
import userModel from "@/models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const POST = async (req) => {
  try {
    await dbConnect();
    const { email, name, password, provider, profilePicture } =
      await req.json();
    if (provider === "google") {
      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
        const token = jwt.sign(
          { userId: existingUser._id, user: existingUser.email },
          process.env.JWT_SECRET
        );
        return Response.json({
          success: true,
          token,
          ...existingUser._doc,
          message: "Login successful",
        });
      }
      const user = await userModel.create({
        name,
        email,
        profilePicture,
      });
      const token = jwt.sign(
        { userId: user._id, user: user.email },
        process.env.JWT_SECRET
      );
      return Response.json({
        success: true,
        token,
        ...user._doc,
        message: "Registration completed successfully",
      });
    }
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return Response.json({
        message: "Email already exists",
        success: false,
      });
    }
    var hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign(
      { userId: user._id, user: user.email },
      process.env.JWT_SECRET
    );
    return Response.json({
      success: true,
      token,
      ...user._doc,
      message: "Registration completed successfully",
    });
  } catch (error) {
    return Response.json({ message: error.message, success: false });
  }
};
