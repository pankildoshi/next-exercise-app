import Workout from "@/models/workout";
import { connectDB } from "@/utils/database";

export const POST = async (req) => {
  const { name, userId, exercises } = await req.json();

  try {
    await connectDB();

    const response = await Workout.insertMany([
      {
        name: name,
        userId: userId,
        exercises: exercises,
      },
    ]);
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

export const DELETE = async (req) => {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");

  try {
    await connectDB();

    const response = await Workout.deleteOne({ _id: id });

    return new Response(
      JSON.stringify({
        message: "Workout deleted",
        data: response,
        status: 200,
      })
    );
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ message: "Something went wrong", status: 500 })
    );
  }
};
