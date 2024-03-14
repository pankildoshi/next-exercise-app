import React from "react";

export default function HistoryWorkoutCard({ workout }) {
  const getDisplayTime = () => {
    const hours = Math.floor(workout.time / 360000);
    const minutes = Math.floor((workout.time % 360000) / 6000);
    const seconds = Math.floor((workout.time % 6000) / 100);

    if (hours > 0) {
      return `${hours}hr ${minutes}min ${seconds}sec`;
    }
    if (minutes > 0) {
      return `${minutes}min ${seconds}sec`;
    }
    return `${seconds}sec`;
  };

  const getTotalkgs = () => {
    let total = 0;
    for (let exercise of workout.exercisesDone) {
      total += exercise.totalkgs;
    }
    return total;
  };

  return (
    <div className="p-4 border min-w-80 max-w-96 border-gray-600 rounded-md bg-white transition hover:shadow-xl">
      <div className="">
        <p className="text-gray-900 font-semibold text-xl">{workout.name}</p>
      </div>
      <div className="mt-1 flex gap-8">
        <div className="flex gap-1 items-baseline">
          <i class="text-rose-600 fa-solid fa-clock"></i>
          <p>{getDisplayTime()}</p>
        </div>
        <div className="flex gap-1 items-baseline">
          <i class="text-rose-600 fa-solid fa-weight-hanging"></i>
          <p>{getTotalkgs()}</p>
        </div>
      </div>
      <div className="mt-4 text-lg">
        {workout.exercisesDone.map((exercise, index) => (
          <p key={index}>
            <span className="mx-1">{exercise.setsDone}</span>
            <i className="text-rose-600 fa-solid fa-xmark"></i>
            <span className="capitalize mx-1">{exercise.name}</span>
          </p>
        ))}
      </div>
      <div className="mt-2">
        <p className="text-gray-600 italic">Date: {workout.date}</p>
      </div>
    </div>
  );
}
