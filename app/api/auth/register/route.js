import bcrypt from "bcrypt";

import User from "@/models/user";
import { connectDB } from "@/utils/database";
import { sendmail, generateVerificationToken } from "@/utils/mail";

export const POST = async (req, res) => {
  const { firstName, lastName, email, password } = await req.json();
  const verificationToken = generateVerificationToken();

  try {
    await connectDB();

    const userExists = await User.findOne({
      email: email,
    });

    const hashedPassword = await bcrypt.hash(password, 10);

    if (!userExists) {
      const user = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        emailVerficationToken: verificationToken,
      });

      await user.save();
      sendmail(email, firstName, verificationToken);
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
      JSON.stringify({ message: "Something went wrong", status: 500 })
    );
  }
};
