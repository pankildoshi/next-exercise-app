import { exerciseOptions } from "@/utils/Options";

export const GET = async (req, { params }) => {
  try {
    const response = await fetch(
      `https://exercisedb.p.rapidapi.com/exercises/name/${params.name}`,
      exerciseOptions
    );
    const exercises = await response.json();

    return new Response(JSON.stringify(exercises), { status: 200 });
  } catch (error) {
    console.error(error);
  }
};
