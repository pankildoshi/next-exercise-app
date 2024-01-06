import { exerciseOptions } from "@/utils/Options";

export const GET = async (req, { params }) => {
  try {
    const response = await fetch(
      `https://exercisedb.p.rapidapi.com/exercises/equipment/${params.type}`,
      exerciseOptions
    );
    const data = await response.json();

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error(error);
  }
};
