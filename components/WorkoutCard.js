"use client";

import React, { useEffect, useState } from "react";

import BodyPartIcon from "@/assets/icons/body-part.png";
import EquipmentIcon from "@/assets/icons/equipment.png";
import TargetIcon from "@/assets/icons/target.png";
import Image from "next/image";
import Link from "next/link";

export default function WorkoutCard({ exerciseId }) {
  const [exercise, setExercise] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/exercises/exercise/${exerciseId}`);
      const data = await response.json();
      setExercise(data);
    };

    fetchData();
  }, []);
  if (!exercise) return;
  return (
    <article className="flex bg-white transition hover:shadow-xl">
      <div className="hidden sm:block sm:basis-56">
        <img
          alt="exericse gif"
          src={exercise.gifUrl}
          className="aspect-square h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div className="border-s border-gray-900/10 p-4 sm:border-l-transparent sm:p-6">
          <Link href={`/main/exercises/details/${exercise.id}`}>
            <h3 className="font-bold uppercase text-gray-900">
              {exercise.name}
            </h3>
          </Link>

          <div className="flex gap-3 items-center my-3">
            <Image src={BodyPartIcon} alt="Bodypart image" />
            <span className="px-2 font-medium py-1 mr-2 rounded-xl text-md uppercase">
              {exercise.bodyPart}
            </span>
          </div>
          <div className="flex gap-3 items-center my-3">
            <Image src={EquipmentIcon} alt="Bodypart image" />
            <span className="px-2 font-medium py-1 mr-2 rounded-xl text-md uppercase">
              {exercise.equipment}
            </span>
          </div>
          <div className="flex gap-3 items-center my-3">
            <Image src={TargetIcon} alt="Bodypart image" />
            <span className="px-2 font-medium py-1 mr-2 rounded-xl text-md uppercase">
              {exercise.target}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
