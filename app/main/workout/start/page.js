"use client";

import SetTile from "@/components/SetTile";
import Spinner from "@/components/Spinner";
import Timer from "@/components/Timer";
import UserContext from "@/utils/UserContext";
import Link from "next/link";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import React, { useContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

const InfoIcon = <i class="fa-solid fa-circle-info"></i>;

export default function page() {
  const timeRef = useRef(null);
  const { user } = useContext(UserContext);

  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [isLoading, setIsLoading] = useState(true);
  const [isStarted, setIsStarted] = useState(false);
  const [shouldShowFinish, setShouldShowFinish] = useState(false);
  const [workout, setWorkout] = useState(null);
  const [exercisesDone, setExercisesDone] = useState([]);

  useEffect(() => {
    if (user === null) {
      redirect("/main");
    }

    fetch(`/api/workout/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setWorkout(data.data);
        setIsLoading(false);

        let exerciseList = [];
        for (let exericse of data.data.exercises) {
          const exerciseDone = {
            id: exericse.id,
            name: exericse.name,
            setsDone: 0,
            kg: exericse.kg,
            reps: exericse.reps,
          };
          exerciseList.push(exerciseDone);
        }
        setExercisesDone([...exerciseList]);
      });
  }, []);

  const handleStart = () => {
    if (!isStarted) {
      timeRef.current.startAndStop();
    }
    setIsStarted(true);
    toast("Workout started", {
      className: "text-xl",
      icon: InfoIcon,
    });
    setShouldShowFinish(true);
  };

  const handleStop = () => {
    if (isStarted) {
      timeRef.current.startAndStop();
    }
    setIsStarted(false);
    toast("Workout stopped", {
      className: "text-xl",
      icon: InfoIcon,
    });
  };

  const handleCancel = () => {
    if (isStarted) {
      // Warning Message & Confirmation
      const response = confirm(
        "Workout is ongoing, Are you sure you want to leave?"
      );
      if (!response) {
        return;
      }
    }
    router.back();
    toast("Workout cancelled", {
      className: "text-xl",
      icon: InfoIcon,
    });
  };

  const handleFinish = () => {
    if (isStarted) {
      const response = confirm("Are you sure you want to finsih the workout?");
      if (!response) {
        return;
      }
    }
    setIsStarted(false);
    timeRef.current.startAndStop();

    const time = timeRef.current.getTime();

    const completedExercises = [];
    for (let exercise of exercisesDone) {
      const totalkgs = exercise.kg * exercise.setsDone;
      const completed = { ...exercise, totalkgs: totalkgs };
      completedExercises.push(completed);
    }

    fetch(`/api/workout/history`, {
      method: "POST",
      body: JSON.stringify({
        name: workout.name,
        exercisesDone: completedExercises,
        time: time,
        userId: user._id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        toast("Workout finished", {
          className: "text-xl",
          icon: "🎉",
        });
        router.replace("/main/workout");
      });
  };

  const handleCheckChange = (event, index) => {
    let data = exercisesDone;
    if (event.target.checked) {
      data[index].setsDone += 1;
    } else {
      data[index].setsDone -= 1;
    }
    setExercisesDone(data);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="my-8 px-3 flex flex-col justify-center mx-auto max-w-lg">
      <div className="flex justify-between items-center my-4 border-b-2 py-4">
        <div>
          <p className="text-2xl font-bold text-gray-900">{workout.name}</p>
          <Timer ref={timeRef} />
        </div>
        {isStarted ? (
          <button
            className="text-white rounded-md bg-rose-600 px-3 py-2 text-lg font-semibold"
            onClick={handleStop}
          >
            Stop
          </button>
        ) : (
          <button
            className="text-white rounded-md bg-rose-600 px-3 py-2 text-lg font-semibold"
            onClick={handleStart}
          >
            Start
          </button>
        )}
      </div>
      <div>
        {workout.exercises.map((exercise, exerciseIndex) => {
          return (
            <div key={exerciseIndex} className="p-4 my-2 rounded-md">
              <Link
                href={`/main/exercises/details/${exercise.id}`}
                target="_blank"
                className="capitalize text-lg text-gray-900 font-semibold hover:text-blue-600 hover:underline"
              >
                {exercise.name}{" "}
                <i class="text-gray-400 text-sm font-thin fa-solid fa-up-right-from-square"></i>
              </Link>
              <div>
                {Array.from({ length: parseInt(exercise.sets) }).map(
                  (_, index) => (
                    <SetTile
                      index={index}
                      exerciseIndex={exerciseIndex}
                      kg={exercise.kg}
                      reps={exercise.reps}
                      handleCheckChange={handleCheckChange}
                    />
                  )
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="block mt-4">
        <button
          className="w-full mb-2 text-rose-600 border-2 border-rose-600 rounded-md bg-white px-3 py-2 text-lg font-semibold"
          onClick={handleCancel}
        >
          Cancel Workout
        </button>
        {shouldShowFinish && (
          <button
            className="w-full mb-2 text-white rounded-md bg-rose-600 px-3 py-2 text-lg font-semibold"
            onClick={handleFinish}
          >
            Finish Workout
          </button>
        )}
      </div>
    </div>
  );
}
