import React from "react";

import BodyPartIcon from "@/assets/icons/body-part.png";
import EquipmentIcon from "@/assets/icons/equipment.png";
import TargetIcon from "@/assets/icons/target.png";
import Image from "next/image";

export default function ExerciseDetails({ exercise }) {
  return (
    <div className="p-1 md:p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <div className="md:mr-12 lg:col-span-1">
        <div className="border-2 rounded-lg h-full">
          <img
            src={exercise.gifUrl}
            alt="Exercise Gif"
            width="400"
            height="600"
          />
        </div>
      </div>
      <div className="lg:col-span-2 mt-4 md:mt-0">
        <p className="font-bold text-2xl md:text-4xl mb-4 capitalize">
          {exercise.name}
        </p>
        <div className="mb-4">
          <p className="text-2xl font-semibold mb-2">Instructions to follow</p>
          {exercise.instructions?.map((instruction, index) => (
            <li key={index} className="italic text-lg">
              {instruction}
            </li>
          ))}
        </div>
        <div className="flex gap-3 items-center my-3">
          <Image src={BodyPartIcon} alt="Bodypart image" />
          <span className="px-2 font-medium py-1 mr-2 rounded-xl text-lg uppercase">
            {exercise.bodyPart}
          </span>
        </div>
        <div className="flex gap-3 items-center my-3">
          <Image src={EquipmentIcon} alt="Bodypart image" />
          <span className="px-2 font-medium py-1 mr-2 rounded-xl text-lg uppercase">
            {exercise.equipment}
          </span>
        </div>
        <div className="flex gap-3 items-center my-3">
          <Image src={TargetIcon} alt="Bodypart image" />
          <span className="px-2 font-medium py-1 mr-2 rounded-xl text-lg uppercase">
            {exercise.target}
          </span>
        </div>
      </div>
    </div>
  );
}
