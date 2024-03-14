import { connectDB } from "@/utils/database";
import Workout from "@/models/workout";

export const GET = async (req, { params }) => {
  const id = params.id;

  try {
    await connectDB();

    const workout = await Workout.findById(id);

    return new Response(
      JSON.stringify({
        data: workout,
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
