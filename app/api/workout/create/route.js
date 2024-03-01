import Workout from "@/models/workout";
import { connectDB } from "@/utils/database";

export const POST = async (req) => {
  const { workout, userId } = await req.json();

  try {
    await connectDB();

    const newWorkout = new Workout({
      workout,
      userId,
    });

    const response = await newWorkout.save();
    return new Response(
      JSON.stringify({
        message: "Workout created",
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
