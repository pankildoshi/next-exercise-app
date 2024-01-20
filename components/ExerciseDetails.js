"use client";

import React, { useEffect, useState } from "react";

import BodyPartIcon from "@/assets/icons/body-part.png";
import EquipmentIcon from "@/assets/icons/equipment.png";
import TargetIcon from "@/assets/icons/target.png";
import Image from "next/image";
import Link from "next/link";

export default function ExerciseDetails({ exercise }) {
  const [showModal, setShowModal] = useState(false);
  const [workouts, setWorkouts] = useState([]);
  const [selectedWorkout, setSelectedWorkout] = useState("");

  useEffect(() => {
    const userId = window.localStorage.getItem("token");

    fetch(`../../api/workout/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setWorkouts(data);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("../../api/workout/addexercise", {
      method: "POST",
      body: JSON.stringify({
        workoutId: selectedWorkout,
        exerciseId: exercise.id,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));

    setShowModal(false);
  };

  return (
    <div className="p-1 md:p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <div className="md:mr-12 lg:col-span-1">
        <div className="border-2 rounded-lg h-full">
          <img
            src={exercise.gifUrl}
            alt="Exercise Gif"
            width="400"
            height="600"
          />
        </div>
      </div>
      <div className="lg:col-span-2 mt-4 md:mt-0">
        <p className="font-bold text-2xl md:text-4xl mb-4 capitalize">
          {exercise.name}
        </p>
        <div className="mb-4">
          <p className="text-2xl font-semibold mb-2">Instructions to follow</p>
          {exercise.instructions?.map((instruction, index) => (
            <li key={index} className="italic text-lg">
              {instruction}
            </li>
          ))}
        </div>
        <div className="flex gap-3 items-center my-3">
          <Image src={BodyPartIcon} alt="Bodypart image" />
          <span className="px-2 font-medium py-1 mr-2 rounded-xl text-lg uppercase">
            {exercise.bodyPart}
          </span>
        </div>
        <div className="flex gap-3 items-center my-3">
          <Image src={EquipmentIcon} alt="Bodypart image" />
          <span className="px-2 font-medium py-1 mr-2 rounded-xl text-lg uppercase">
            {exercise.equipment}
          </span>
        </div>
        <div className="flex gap-3 items-center my-3">
          <Image src={TargetIcon} alt="Bodypart image" />
          <span className="px-2 font-medium py-1 mr-2 rounded-xl text-lg uppercase">
            {exercise.target}
          </span>
        </div>
        <div className="mt-8">
          {window.localStorage.getItem("token") != null ? (
            <button
              className="text-white bg-rose-600 font-semibold text-lg rounded-xl py-4 px-3"
              onClick={() => setShowModal(true)}
            >
              Add to workout
            </button>
          ) : (
            <div className="text-black bg-rose-100 font-light italic text-lg rounded-xl py-4 px-3">
              <Link href="/auth/login" className="text-blue-700">
                Sign in
              </Link>{" "}
              & Add exercise to your workout!
            </div>
          )}
        </div>
      </div>

      <div
        className={`${
          showModal ? "" : "hidden"
        } flex items-center justify-center h-screen w-full absolute top-0 left-0 backdrop-brightness-50`}
      >
        <div
          id="create-workout-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="overflow-y-auto overflow-x-hidden z-50 justify-center items-center w-full md:w-1/2 mx-auto lg:w-1/3 md:inset-0 max-h-full"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow ">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                <h3 className="text-xl font-semibold text-gray-900 ">
                  Add to Workout
                </h3>
                <button
                  type="button"
                  className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                  data-modal-hide="create-workout-modal"
                  onClick={() => setShowModal(false)}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              <div className="p-4 md:p-5">
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Your Workouts
                    </label>
                    <select
                      value={selectedWorkout}
                      onChange={(e) => {
                        setSelectedWorkout(e.target.value);
                      }}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    >
                      <option value="">Select workout</option>
                      {workouts.map((workout) => (
                        <option key={workout._id} value={workout._id}>
                          {workout.workout}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="bg-rose-600 border border-gray-300 text-white text-sm rounded-lg block w-full p-2.5 "
                    >
                      Add
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
