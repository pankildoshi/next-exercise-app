import { connectDB } from "@/utils/database";
import User from "@/models/user";

export const POST = async (req, res) => {
  const { firstName, lastName, email, password } = await req.json();

  try {
    await connectDB();

    const userExists = await User.findOne({
      email: email,
    });

    if (!userExists) {
      const user = new User({
        firstName,
        lastName,
        email,
        password,
      });

      await user.save();
      return new Response(
        JSON.stringify({ message: "User created", status: 201 })
      );
    } else {
      return new Response(
        JSON.stringify({ message: "User already exists", status: 400 })
      );
    }
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ message: "Something went wrong", status: 201 })
    );
  }
};
