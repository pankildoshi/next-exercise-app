"use client";

import React, { useEffect, useState } from "react";
import ExerciseCard from "./ExerciseCard";
import HorizontalScrollbar from "./HorizontalScrollbar";

export default function SimilarExercises({ equipment, target }) {
  const [similarEquipmentExercise, setSimilarEquipmentExercise] = useState([]);
  const [similarTargetExercise, setSimilarTargetExercise] = useState([]);

  useEffect(() => {
    const fetchEquipmentData = async () => {
      const res = await fetch(`/api/exercises/equipment/${equipment}`);
      const data = await res.json();

      setSimilarEquipmentExercise(data);
    };

    const fetchTargetData = async () => {
      const res = await fetch(`/api/exercises/target/${target}`);
      const data = await res.json();

      setSimilarTargetExercise(data);
    };

    fetchEquipmentData();
    fetchTargetData();
  }, []);

  return (
    <div className="p-1 md:p-6">
      <div className="my-4">
        <p className="my-4 text-2xl lg:text-3xl font-semibold">
          Similar exercises based on equipment -{" "}
          <span className="capitalize text-rose-600">{equipment}</span>
        </p>
        <div className="mt-2">
          <HorizontalScrollbar>
            {similarEquipmentExercise?.map((item) => (
              <ExerciseCard
                key={item.id || item}
                itemId={item.id || item}
                exercise={item}
              />
            ))}
          </HorizontalScrollbar>
        </div>
      </div>
      <div className="my-4">
        <p className="my-4 text-2xl lg:text-3xl font-semibold">
          Similar exercises based on target -{" "}
          <span className="capitalize text-rose-600">{target}</span>
        </p>
        <div className="mt-2">
          <HorizontalScrollbar>
            {similarTargetExercise?.map((item) => (
              <ExerciseCard
                key={item.id || item}
                itemId={item.id || item}
                exercise={item}
              />
            ))}
          </HorizontalScrollbar>
        </div>
      </div>
    </div>
  );
}
