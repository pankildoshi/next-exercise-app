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
    const fetchData = async () => {
      const response = await fetch(`../../api/exercises/exercise/${params.id}`);
      const data = await response.json();
      setExercise(data);

      const vidResponse = await fetch(`../../api/exercises/video/${data.name}`);
      const vidData = await vidResponse.json();

      setExerciseVideos(vidData);
    };

    fetchData();
  }, []);

  if (exercise == null) {
    return <Spinner text="Loading..." />;
  }

  return (
    <>
      <ExerciseDetails exercise={exercise} />
      <ExerciseVideos name={exercise.name} exerciseVideos={exerciseVideos} />
      <SimilarExercises
        equipment={exercise.equipment}
        target={exercise.target}
      />
    </>
  );
}
