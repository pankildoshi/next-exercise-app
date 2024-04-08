import bcrypt from "bcrypt";

import User from "@/models/user";
import { connectDB } from "@/utils/database";

export const POST = async (req, res) => {
  const { email, password } = await req.json();

  try {
    await connectDB();

    const userExists = await User.findOne({
      email,
    });

    if (userExists) {
      if (!userExists.isEmailVerified) {
        return new Response(
          JSON.stringify({
            message: "Please verify your email and try again.",
            status: 400,
          })
        );
      }

      const isPasswordValid = await bcrypt.compare(
        password,
        userExists.password
      );

      if (isPasswordValid) {
        return new Response(
          JSON.stringify({
            user: {
              _id: userExists._id,
              firstName: userExists.firstName,
              lastName: userExists.lastName,
              email: userExists.email,
            },
            message: "Login successful",
            status: 200,
          })
        );
      } else {
        return new Response(
          JSON.stringify({
            message: "Invalid email or password!",
            status: 400,
          })
        );
      }
    }
  } catch (error) {
    console.log(error);
  }
  return new Response(
    JSON.stringify({ message: "Something went wrong", status: 500 })
  );
};
