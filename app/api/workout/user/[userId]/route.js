import { connectDB } from "@/utils/database";
import Workout from "@/models/workout";

export const GET = async (req, { params }) => {
  const userId = params.userId;

  try {
    await connectDB();

    const workouts = await Workout.find({
      userId,
    });

    return new Response(JSON.stringify(workouts), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "Something went wrong" }), {
      status: 500,
    });
  }
};
