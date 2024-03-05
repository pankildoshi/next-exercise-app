import User from "@/models/user";
import { connectDB } from "@/utils/database";

export const POST = async (req) => {
  const { token } = await req.json();

  try {
    await connectDB();

    const user = await User.findOne({ emailVerficationToken: token });

    if (user) {
      const res = await User.updateOne(
        { email: user.email },
        { isEmailVerified: true, emailVerficationToken: null }
      );

      if (res.modifiedCount == 1) {
        return new Response(
          JSON.stringify({ message: "Email verified successfully :)" })
        );
      } else {
        return new Response(
          JSON.stringify({ message: "Something went wrong :(" })
        );
      }
    }
  } catch (error) {
    console.log(error);
  }
  return new Response(JSON.stringify({ message: "Link Expired :(" }));
};
