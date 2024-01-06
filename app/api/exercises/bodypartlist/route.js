import { exerciseOptions } from "@/utils/Options";

export const GET = async () => {
  try {
    const response = await fetch(
      "https://exercisedb.p.rapidapi.com/exercises/bodyPartList",
      exerciseOptions
    );
    const bodyPartList = await response.json();

    return new Response(JSON.stringify(bodyPartList), { status: 200 });
  } catch (error) {
    console.error(error);
  }
};
