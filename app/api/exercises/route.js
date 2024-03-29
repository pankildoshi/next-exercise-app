import Exercise from "@/models/exercise";
import { connectDB } from "@/utils/database";

export const GET = async () => {
  try {
    connectDB();

    const exercises = await Exercise.find(
      {},
      { secondaryMuscles: 0, instructions: 0 }
    );

    return new Response(JSON.stringify(exercises), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response({ message: "Something went wrong :(", status: 500 });
  }
};
