"use client";
import ExerciseVideos from "@/components/ExerciseVideos";
import SimilarExercises from "@/components/SimilarExercises";
import ExerciseDetails from "@/components/ExerciseDetails";
import Spinner from "@/components/Spinner";
import React, { useEffect, useState } from "react";

export default function Page({ params }) {
  const [exercise, setExercise] = useState(null);
  const [exerciseVideos, setExerciseVideos] = useState([]);

  useEffect(() => {
    fetch(`/api/exercises/exercise/${params.id}`)
      .then((res) => res.json())
      .then((data) => setExercise(data));

    // fetch(`/api/exercises/video/${exercise.name}`)
    //   .then((res) => {
    //     console.log(res);
    //     res.json();
    //   })
    //   .then((data) => setExerciseVideos(data));
  }, []);

  if (exercise == null) {
    return <Spinner text="Loading..." />;
  }

  return (
    <>
      <ExerciseDetails exercise={exercise} />
      {/* <ExerciseVideos name={exercise.name} exerciseVideos={exerciseVideos} /> */}
      <SimilarExercises
        equipment={exercise.equipment}
        target={exercise.target}
      />
    </>
  );
}
