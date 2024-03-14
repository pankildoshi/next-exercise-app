import React from "react";

export default function ExerciseTile({
  index,
  exerciseTile,
  exercises,
  handleExerciseTilesChange,
  handleRemoveTile,
}) {
  return (
    <div className="my-4">
      <div className="mt-2">
        <div className="flex gap-1 items-baseline">
          <label className="block text-lg font-medium text-gray-700">
            Exercise
          </label>
          <button
            onClick={() => handleRemoveTile(index)}
            type="button"
            className="text-rose-600 px-3 py-2 sm:text-lg"
          >
            <i className="fa-solid fa-trash"></i>
          </button>
        </div>
        <div className="mt-1">
          <select
            required
            type="text"
            name="name"
            className="capitalize rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-lg"
            onChange={(e) => handleExerciseTilesChange(e, index)}
            value={exerciseTile.name}
          >
            {exercises.map((exercise, ind) => (
              <option
                key={ind}
                value={exercise.name}
                className="text-md px-3 py-2 capitalize"
              >
                {exercise.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-2">
        <label className="block text-lg font-medium text-gray-700">SETS</label>
        <div className="mt-1">
          <input
            required
            type="number"
            name="sets"
            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-lg"
            onChange={(e) => handleExerciseTilesChange(e, index)}
            value={exerciseTile.sets}
          />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:gap-4">
        <div className="mt-2">
          <label className="block text-lg font-medium text-gray-700">KG</label>
          <div className="mt-1">
            <input
              required
              type="number"
              name="kg"
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-lg"
              onChange={(e) => handleExerciseTilesChange(e, index)}
              value={exerciseTile.kg}
            />
          </div>
        </div>
        <div className="mt-2">
          <label className="block text-lg font-medium text-gray-700">
            REPS
          </label>
          <div className="mt-1">
            <input
              required
              type="number"
              name="reps"
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-lg"
              onChange={(e) => handleExerciseTilesChange(e, index)}
              value={exerciseTile.reps}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
