"use client";

import React, { useEffect, useState } from "react";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import ExerciseCard from "./ExerciseCard";

export default function SimilarExercises({ equipment, target }) {
  const [similarEquipmentExercise, setSimilarEquipmentExercise] = useState([]);
  const [similarTargetExercise, setSimilarTargetExercise] = useState([]);

  useEffect(() => {
    const fetchEquipmentData = async () => {
      const res = await fetch(`../../api/exercises/equipment/${equipment}`);
      const data = await res.json();

      setSimilarEquipmentExercise(data);
    };

    const fetchTargetData = async () => {
      const res = await fetch(`../../api/exercises/target/${target}`);
      const data = await res.json();

      setSimilarTargetExercise(data);
    };

    fetchEquipmentData();
    fetchTargetData();
  }, []);

  return (
    <div className="p-1 md:p-6">
      <div className="mt-4">
        <p className="my-4 text-2xl lg:text-3xl font-semibold">
          Similar exercises based on equipment
        </p>
        <ScrollMenu>
          {similarEquipmentExercise?.map((item) => (
            <div itemId={item.id} key={item.id} className="mx-4 w-[450px]">
              <ExerciseCard exercise={item} />
            </div>
          ))}
        </ScrollMenu>
      </div>
      <div className="mt-4">
        <p className="my-4 text-2xl lg:text-3xl font-semibold">
          Similar exercises based on target
        </p>
        <ScrollMenu>
          {similarTargetExercise?.map((item) => (
            <div key={item.id} className="mx-4 w-[450px] h-[300px]">
              <ExerciseCard exercise={item} />
            </div>
          ))}
        </ScrollMenu>
      </div>
    </div>
  );
}
