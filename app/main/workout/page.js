"use client";

import Accordian from "@/components/Accordian";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function page() {
  let router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [workout, setWorkout] = useState("");
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const userId = window.localStorage.getItem("token");

    fetch(`/api/workout/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setWorkouts(data);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const userId = window.localStorage.getItem("token");
    fetch("/api/workout/create", {
      method: "POST",
      body: JSON.stringify({
        workout,
        userId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        workouts.push(data.data);
        setWorkout("");
      });

    setShowModal(false);
  };

  if (localStorage.getItem("token") == null) {
    router.push("/");
    return;
  }

  return (
    <div className="min-h-[75vh] lg:px-6">
      {workouts.length === 0 ? (
        <div className="min-h-[75vh] lg:px-6">
          <div className="flex flex-col justify-center items-center my-12">
            <p className="text-rose-600 opacity-50 text-[140px]">
              No Workouts!
            </p>
            <p className="text-3xl">Add your exercises to your workout</p>
            <button
              type="button"
              data-modal-target="authentication-modal"
              data-modal-toggle="authentication-modal"
              className="text-white bg-rose-600 font-semibold text-lg rounded-xl py-4 px-3 my-8"
              onClick={() => {
                setShowModal(true);
                console.log(showModal);
              }}
            >
              Create Workout
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <p className="text-3xl font-semibold">Your Workouts</p>
            <button
              type="button"
              data-modal-target="authentication-modal"
              data-modal-toggle="authentication-modal"
              className="text-white bg-rose-600 font-semibold text-lg rounded-xl py-4 px-3"
              onClick={() => setShowModal(true)}
            >
              Create Workout
            </button>
          </div>
          <div className="flex flex-col py-6">
            {workouts.map((workout, index) => (
              <Accordian key={index} workout={workout} />
            ))}
          </div>
        </>
      )}
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
                  Create Workout
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
                      Name your workout
                    </label>
                    <input
                      type="text"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                      placeholder="Workout name"
                      value={workout}
                      onChange={(e) => setWorkout(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="bg-rose-600 border border-gray-300 text-white text-sm rounded-lg block w-full p-2.5 "
                    >
                      Create Workout
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
