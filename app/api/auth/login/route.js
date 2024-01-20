import { connectDB } from "@/utils/database";
import User from "@/models/user";

export const POST = async (req, res) => {
  const { email, password } = await req.json();

  try {
    await connectDB();

    const userExists = await User.findOne({
      email,
    });

    if (userExists && password === userExists.password) {
      return new Response(
        JSON.stringify({
          user: userExists,
          message: "Login successful",
          status: 200,
        })
      );
    } else {
      return new Response(
        JSON.stringify({ message: "No such user found", status: 400 })
      );
    }
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ message: "Something went wrong", status: 500 })
    );
  }
};
