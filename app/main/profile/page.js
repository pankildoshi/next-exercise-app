"use client";

import HistoryWorkoutCard from "@/components/HistoryWorkoutCard";
import Spinner from "@/components/Spinner";
import React, { useEffect, useState } from "react";

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

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="flex justify-between items-center px-4">
        <p className="text-3xl font-semibold">Workout History</p>
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
