"use client";

import ExerciseTile from "@/components/ExerciseTile";
import Spinner from "@/components/Spinner";
import UserContext from "@/utils/UserContext";
import { useRouter, redirect } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function page() {
  const { user } = useContext(UserContext);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const [workoutName, setWorkoutName] = useState("");
  const [exerciseTiles, setExerciseTiles] = useState([
    { id: "0001", name: "3/4 sit-up", sets: 0, kg: 0, reps: 0 },
  ]);
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    if (user === null) {
      redirect("/main");
    }

    fetch("/api/exercises")
      .then((res) => res.json())
      .then((data) => {
        setExercises(data);
        setIsLoading(false);
      });
  }, []);

  const handleExerciseTilesChange = (event, index) => {
    const { name, value } = event.target;
    let data = [...exerciseTiles];
    data[index][name] = value;
    setExerciseTiles(data);
  };

  const addExerciseTile = () => {
    let newTile = { id: "0001", name: "3/4 sit-up", sets: 0, kg: 0, reps: 0 };
    setExerciseTiles([...exerciseTiles, newTile]);
  };

  const removeExerciseTile = (index) => {
    let data = [...exerciseTiles];
    data.splice(index, 1);
    setExerciseTiles(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    exerciseTiles.forEach((tile) => {
      const exercise = exercises.find(
        (exercise) => exercise.name === tile.name
      );
      tile.id = exercise.id;
    });

    fetch("/api/workout", {
      method: "POST",
      body: JSON.stringify({
        name: workoutName,
        userId: user._id,
        exercises: exerciseTiles,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success(data.message, {
          className: "text-xl",
        });
        router.push("/main/workout");
      });
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="my-8 px-3 flex flex-col justify-center mx-auto max-w-lg">
      <p className="text-3xl font-bold">Create Workout</p>
      <form onSubmit={handleSubmit}>
        <div className="mt-2">
          <label className="block text-lg font-medium text-gray-700">
            Workout Name
          </label>
          <div className="mt-1">
            <input
              required
              type="text"
              value={workoutName}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-lg"
              placeholder="Workout name"
              onChange={(e) => setWorkoutName(e.target.value)}
            />
          </div>
        </div>
        <div>
          {exerciseTiles.map((exerciseTile, index) => (
            <ExerciseTile
              key={index}
              index={index}
              exerciseTile={exerciseTile}
              exercises={exercises}
              handleExerciseTilesChange={handleExerciseTilesChange}
              handleRemoveTile={removeExerciseTile}
            />
          ))}
        </div>
        <div className="mt-2">
          <button
            type="button"
            className="text-rose-600 border border-rose-600 w-full px-3 py-2 rounded-md sm:text-lg"
            onClick={addExerciseTile}
          >
            <i className="fa-solid fa-plus"></i>
            <span className="mx-2">Add Exercise</span>
          </button>
        </div>
        <div className="mt-2">
          <button
            type="submit"
            className="text-white bg-rose-600 border border-rose-600 w-full px-3 py-2 rounded-md sm:text-lg"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
