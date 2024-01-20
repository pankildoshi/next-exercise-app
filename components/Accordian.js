"use client";

import React, { useEffect, useState } from "react";
import WorkoutCard from "./WorkoutCard";

export default function Accordian({ workout }) {
  const [toggle, setToggle] = useState(false);
  const [workoutExercises, setWorkoutExercises] = useState([]);

  useEffect(() => {
    fetch(`../../api/workout/getexercise/${workout._id}`)
      .then((res) => res.json())
      .then((data) => setWorkoutExercises(data));
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setToggle((prev) => setToggle(!prev))}
        className="flex items-center justify-between w-full p-5 my-2 font-medium rtl:text-right text-gray-500 border border-gray-200 rounded-xl"
      >
        <span>{workout.workout}</span>
        <svg
          data-accordion-icon
          className="w-3 h-3 rotate-180 shrink-0"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5 5 1 1 5"
          />
        </svg>
      </button>

      <div
        id="accordion-collapse-body-1"
        className={toggle ? "block" : "hidden"}
      >
        <div className="p-5 border border-t-0 border-gray-200 ">
          {workoutExercises.length > 0 ? (
            workoutExercises.map((item, index) => (
              <WorkoutCard key={index} exerciseId={item.exerciseId} />
            ))
          ) : (
            <div>
              <p>No exercises</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
