import Link from "next/link";
import React from "react";

export default function ExerciseCard({ exercise }) {
  return (
    <div className="w-[400px] text-left p-4 border border-b-4 border-b-rose-600 shadow-lg rounded-lg">
      <Link href={`../../main/exercises/details/${exercise.id}`}>
        <div className="flex justify-center">
          <img
            width="200"
            height="200"
            src={exercise.gifUrl}
            alt="exercise gif"
          />
        </div>
        <p className="text-xl py-2 font-semibold capitalize">{exercise.name}</p>
        <div className="flex gap-2">
          <button className="px-2 rounded-lg text-sm bg-orange-500 text-white">
            {exercise.bodyPart.toUpperCase()}
          </button>
          <button className="px-2 rounded-lg text-sm bg-green-500 text-white">
            {exercise.target.toUpperCase()}
          </button>
        </div>
      </Link>
    </div>
  );
}
