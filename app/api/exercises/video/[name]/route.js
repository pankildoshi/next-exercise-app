import { ytOptions } from "@/utils/Options";

export const GET = async (req, { params }) => {
  try {
    const response = await fetch(
      `https://youtube-search-and-download.p.rapidapi.com/search?query=${params.name}`,
      ytOptions
    );
    const data = await response.json();

    return new Response(JSON.stringify(data.contents), { status: 200 });
  } catch (error) {
    console.error(error);
  }
};
