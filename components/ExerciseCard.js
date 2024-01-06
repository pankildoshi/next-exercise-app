import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function ExerciseCard({ exercise }) {
  return (
    <Link
      href={`../../exercises/details/${exercise.id}`}
      className="w-[400px] text-left p-4 my-4 border border-b-4 border-b-rose-600 shadow-lg rounded-lg"
    >
      <div className="flex justify-center">
        <img
          width="200"
          height="200"
          src={exercise.gifUrl}
          alt="exercise gif"
        />
      </div>
      <div className="flex gap-2">
        <button className="px-2 rounded-lg bg-orange-500 text-white">
          {exercise.bodyPart.toUpperCase()}
        </button>
        <button className="px-2 rounded-lg bg-green-500 text-white">
          {exercise.target.toUpperCase()}
        </button>
      </div>
      <p className="text-lg py-2 font-semibold capitalize">{exercise.name}</p>
    </Link>
  );
}
