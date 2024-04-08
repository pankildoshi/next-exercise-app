"use client";

import React, { useContext, useEffect, useState } from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import Spinner from "@/components/Spinner";
import WorkoutCard from "@/components/WorkoutCard";
import toast from "react-hot-toast";
import UserContext from "@/utils/UserContext";

export default function page() {
  const { user } = useContext(UserContext);

  const [workouts, setWorkouts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user === null) {
      redirect("/main");
    }

    fetch(`/api/workout/user/${user._id}`)
      .then((res) => res.json())
      .then((data) => {
        setWorkouts(data);
        setIsLoading(false);
      });
  }, []);

  const deleteWorkout = (id) => {
    fetch(`/api/workout?id=${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setWorkouts(workouts.filter((workout) => workout._id !== id));
        toast.success(data.message, {
          className: "text-xl",
        });
      });
  };

  if (isLoading) {
    return <Spinner />;
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
            <Link
              className="text-white bg-rose-600 font-semibold text-lg rounded-xl py-4 px-3 my-8"
              href="/main/workout/create"
            >
              Create Workout
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center px-4">
            <p className="text-3xl font-semibold">Your Workouts</p>
            <Link
              className="text-white bg-rose-600 font-semibold text-lg rounded-xl py-4 px-3 my-8"
              href="/main/workout/create"
            >
              Create Workout
            </Link>
          </div>
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 px-4 py-6">
            {workouts.map((workout, index) => (
              <WorkoutCard
                key={index}
                workout={workout}
                deleteWorkout={deleteWorkout}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
