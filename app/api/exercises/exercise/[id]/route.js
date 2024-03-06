import Exercise from "@/models/exercise";
import { connectDB } from "@/utils/database";

export const GET = async (req, { params }) => {
  const { id } = params;
  try {
    connectDB();

    const exercise = await Exercise.findOne({ id: id });

    return new Response(JSON.stringify(exercise), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response({ message: "Something went wrong :(", status: 500 });
  }
};
