"use client";

import React, { useState } from "react";

export default function SetTile({
  index,
  exerciseIndex,
  kg,
  reps,
  handleCheckChange,
}) {
  const [complete, setComplete] = useState(false);

  return (
    <div
      key={index}
      className={`${
        complete
          ? "bg-teal-200 hover:bg-teal-300"
          : "bg-gray-50 hover:bg-gray-100"
      } w-full flex justify-between items-center my-1 p-3 text-base font-bold text-gray-900 rounded-lg group hover:shadow`}
    >
      <p className="font-sans text-base">Set {index + 1}</p>
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-center">
          <p>KG</p>
          <p>{kg}</p>
        </div>
        <div className="flex flex-col items-center">
          <p>REPS</p>
          <p>{reps}</p>
        </div>

        <input
          type="checkbox"
          name="complete"
          className="w-5 h-5 text-teal-600 bg-gray-100 border-gray-300 rounded focus:ring-teal-500"
          onChange={(e) => {
            setComplete((prev) => !prev);
            handleCheckChange(e, exerciseIndex);
          }}
        />
      </div>
    </div>
  );
}
