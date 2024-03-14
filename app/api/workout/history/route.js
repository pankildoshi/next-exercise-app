import WorkoutDone from "@/models/workoutDone";
import { connectDB } from "@/utils/database";

export const POST = async (req) => {
  const { name, userId, exercisesDone, time } = await req.json();

  try {
    await connectDB();

    const response = await WorkoutDone.insertMany([
      {
        name: name,
        userId: userId,
        exercisesDone: exercisesDone,
        time: time,
      },
    ]);
    return new Response(
      JSON.stringify({
        message: "Workout history saved",
        data: response,
        status: 201,
      })
    );
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ message: "Something went wrong", status: 500 })
    );
  }
};
