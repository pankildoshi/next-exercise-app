import WorkoutExercise from "@/models/workout_exercise";
import { connectDB } from "@/utils/database";

export const POST = async (req) => {
  const { workoutId, exerciseId } = await req.json();

  try {
    await connectDB();

    const newWorkoutExercise = new WorkoutExercise({
      workoutId,
      exerciseId,
    });

    await newWorkoutExercise.save();
    return new Response(
      JSON.stringify({ message: "Exercise Added to Workout", status: 201 })
    );
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ message: "Something went wrong", status: 500 })
    );
  }
};
