import Link from "next/link";
import React from "react";

export default function ExerciseCard({ exercise }) {
  return (
    <div className="m-4 max-w-sm">
      <div class="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
        <div class="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white shadow-lg bg-clip-border rounded-xl h-80">
          <img src={exercise.gifUrl} alt="Exercise-GIF" />
        </div>
        <div class="p-6 text-center">
          <h4 class="capitalize text-nowrap overflow-hidden hover:overflow-visible hover:text-wrap block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-gray-900">
            {exercise.name}
          </h4>
          <p class="uppercase block font-sans text-base antialiased font-medium leading-relaxed bg-clip-text bg-gradient-to-tr from-gray-600 to-gray-400">
            {exercise.target} / {exercise.bodyPart}
          </p>
        </div>
        <div class="flex justify-center p-6 pt-2 gap-5">
          <Link
            href={`/main/exercises/details/${exercise.id}`}
            class="block font-sans text-xl antialiased font-medium leading-relaxed text-rose-600"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
}
