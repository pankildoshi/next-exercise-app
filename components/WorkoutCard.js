import Link from "next/link";
import React from "react";

export default function WorkoutCard({ workout, deleteWorkout }) {
  return (
    <div className="p-4 border min-w-80 max-w-96 border-gray-600 rounded-md bg-white transition hover:shadow-xl">
      <div className="flex flex-row justify-between items-center">
        <p className="text-gray-600 font-semibold text-xl">{workout.name}</p>
        <div className="flex gap-4">
          <button
            title="Delete Workout"
            className="text-rose-600"
            onClick={() => deleteWorkout(workout._id)}
          >
            <i className="fa-solid fa-trash"></i>
          </button>
          <Link
            title="Start Workout"
            className="text-rose-600"
            href={`/main/workout/start?id=${workout._id}`}
          >
            <i className="fa-solid fa-play"></i>
          </Link>
        </div>
      </div>
      <div className="mt-4 text-lg">
        {workout.exercises.map((exercise, index) => (
          <p key={index}>
            <span className="mx-1">{exercise.sets}</span>
            <i className="fa-solid fa-xmark"></i>
            <span className="capitalize mx-1">{exercise.name}</span>
          </p>
        ))}
      </div>
    </div>
  );
}
