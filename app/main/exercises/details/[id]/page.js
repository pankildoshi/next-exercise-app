"use client";
import SimilarExercises from "@/components/SimilarExercises";
import ExerciseDetails from "@/components/ExerciseDetails";
import Spinner from "@/components/Spinner";
import React, { useEffect, useState } from "react";

export default function Page({ params }) {
  const [exercise, setExercise] = useState(null);

  useEffect(() => {
    fetch(`/api/exercises/exercise/${params.id}`)
      .then((res) => res.json())
      .then((data) => setExercise(data));
  }, []);

  if (exercise == null) {
    return <Spinner text="Loading..." />;
  }

  return (
    <div className="px-6 md:px-0">
      <ExerciseDetails exercise={exercise} />
      <SimilarExercises
        equipment={exercise.equipment}
        target={exercise.target}
      />
    </div>
  );
}
