import { connectDB } from "@/utils/database";
import WorkoutExercise from "@/models/workout_exercise";

export const GET = async (req, { params }) => {
  const workoutId = params.id;

  try {
    await connectDB();

    const data = await WorkoutExercise.find({
      workoutId,
    });

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "Something went wrong" }), {
      status: 500,
    });
  }
};
