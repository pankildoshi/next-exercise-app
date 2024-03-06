import Exercise from "@/models/exercise";
import { connectDB } from "@/utils/database";

export const GET = async (req, { params }) => {
  const { name } = params;
  try {
    connectDB();

    const exercises = await Exercise.find({
      name: { $regex: `.*${name}.*`, $options: "i" },
    }).limit(10);

    return new Response(JSON.stringify(exercises), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response({ message: "Something went wrong :(", status: 500 });
  }
};
