import Exercise from "@/models/exercise";
import { connectDB } from "@/utils/database";

export const GET = async (req, { params }) => {
  const { target } = params;
  try {
    connectDB();

    const data = await Exercise.find({ target: target }).limit(5);

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response({ message: "Something went wrong :(", status: 500 });
  }
};
