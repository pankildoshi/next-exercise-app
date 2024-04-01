"use client";

import React, { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import dynamic from "next/dynamic";
import Image from "next/image";

import UserImage from "@/assets/images/user.jpg";
import HistoryWorkoutCard from "@/components/HistoryWorkoutCard";
import Spinner from "@/components/Spinner";

const WeightChart = dynamic(() => import("@/components/WeightChart"), {
  ssr: false,
});
const WorkoutCountChart = dynamic(
  () => import("@/components/WorkoutCountChart"),
  { ssr: false }
);

export default function page() {
  const [workouts, setWorkouts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userId = window.localStorage.getItem("token");

    if (userId === null) {
      redirect("/main");
    }

    fetch(`/api/workout/history?id=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setWorkouts(data.data);
        setIsLoading(false);
      });
  }, []);

  const getDisplayTime = (time) => {
    const hours = Math.floor(time / 360000);
    const minutes = Math.floor((time % 360000) / 6000);
    const seconds = Math.floor((time % 6000) / 100);

    if (hours > 0) {
      return `${hours}hr ${minutes}min ${seconds}sec`;
    }
    if (minutes > 0) {
      return `${minutes}min ${seconds}sec`;
    }
    return `${seconds}sec`;
  };

  const getAvgWorkoutTime = () => {
    const today = new Date();
    const dateBefore7days = new Date(today);
    dateBefore7days.setDate(today.getDate() - 7);
    dateBefore7days.setHours(0, 0, 0, 0);

    let totalTime = 0;
    let maxTime = 0;
    let minTime = Number.MAX_SAFE_INTEGER;
    for (var workout of workouts) {
      const dateobj = new Date(workout.date);
      if (dateobj >= new Date(dateBefore7days)) {
        totalTime += parseInt(workout.time);
        maxTime = maxTime < workout.time ? workout.time : maxTime;
        minTime = minTime > workout.time ? workout.time : minTime;
      }
    }

    let avgTime = totalTime / 7;

    return [
      getDisplayTime(avgTime),
      getDisplayTime(maxTime),
      getDisplayTime(minTime),
    ];
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="px-4 flex gap-4">
        <Image
          className="rounded-full w-14 h-14"
          src={UserImage}
          alt="profile picture"
        />
        <div>
          <p className="text-2xl font-semibold">
            {localStorage.getItem("displayName")}
          </p>
          <p className="text-slate-500 text-sm">
            {localStorage.getItem("userEmail")}
          </p>
        </div>
      </div>
      <div className="mt-4 p-3 flex flex-col lg:flex-row gap-6">
        <div className="">
          <p className="text-lg text-slate-900 font-medium">
            Average Workout Time
          </p>
          <p className="text-sm text-slate-500">Past 7 days</p>
          <div className="mt-8 flex justify-center items-center">
            <div className="w-32 h-32 rounded-full border-8 border-rose-600 flex justify-center items-center text-center">
              <p className="font-medium text-lg">{getAvgWorkoutTime()[0]}</p>
            </div>
          </div>
          <div className="mt-6 flex justify-between gap-x-8">
            <div>
              <p className="text-md font-medium text-slate-700">Longest Time</p>
              <p>{getAvgWorkoutTime()[1]}</p>
            </div>
            <div>
              <p className="text-md font-medium text-slate-700">
                Shortest Time
              </p>
              <p>{getAvgWorkoutTime()[2]}</p>
            </div>
          </div>
        </div>
        <div className="">
          <p className="text-lg text-slate-900 font-medium">Weight lifted</p>
          <p className="text-sm text-slate-500">Past 7 days</p>
          <WeightChart workouts={workouts} />
        </div>
        <div className="">
          <p className="text-lg text-slate-900 font-medium">Workouts Done</p>
          <p className="text-sm text-slate-500">
            Numbers of workouts completed
          </p>
          <WorkoutCountChart workouts={workouts} />
        </div>
      </div>
      <div className="flex justify-between items-center px-4 mt-4">
        <p className="text-2xl font-semibold">Workout History</p>
      </div>
      {workouts.length === 0 ? (
        <div>No history</div>
      ) : (
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 px-4 py-6">
          {workouts.map((workout, index) => (
            <HistoryWorkoutCard key={index} workout={workout} />
          ))}
        </div>
      )}
    </>
  );
}
