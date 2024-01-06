import { exerciseOptions } from "@/utils/Options";

export const GET = async (req, { params }) => {
  try {
    const response = await fetch(
      `https://exercisedb.p.rapidapi.com/exercises/exercise/${params.id}`,
      exerciseOptions
    );
    const exercise = await response.json();

    return new Response(JSON.stringify(exercise), { status: 200 });
  } catch (error) {
    console.error(error);
  }
};
