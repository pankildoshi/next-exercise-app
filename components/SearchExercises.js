"use client";

import React, { useEffect, useState } from "react";
import HorizontalScrollbar from "./HorizontalScrollbar";
import ExerciseCard from "./ExerciseCard";
import Spinner from "./Spinner";
import { bodyPartList } from "@/utils/bodypartList";
import BodyPart from "./BodyPart";

export default function SearchExercises() {
  const [bodyPart, setBodyPart] = useState("all");

  const [isSearched, setIsSearched] = useState(false);
  const [searching, setSearching] = useState(false);
  const [search, setSearch] = useState("");
  const [exercises, setExercises] = useState([]);
  const [filteredExercises, setFilterExercises] = useState([]);

  useEffect(() => {
    fetch("/api/exercises")
      .then((res) => res.json())
      .then((data) => {
        setExercises(data);
        setFilterExercises(data);
      });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setIsSearched(true);
    setSearching(true);

    fetch(`/api/exercises/name/${search}`)
      .then((res) => res.json())
      .then((data) => {
        setExercises(data);
        setFilterExercises(data);
        setBodyPart("all");
        setSearching(false);
      });
  };

  const handleBodyPartChange = (bodyPartLocal) => {
    let selectedExercises = [];
    if (bodyPartLocal === "all") {
      setFilterExercises(exercises);
    } else {
      for (let exercise of exercises) {
        if (exercise.bodyPart === bodyPartLocal) {
          selectedExercises.push(exercise);
        }
      }
      setFilterExercises(selectedExercises);
    }
  };

  return (
    <section id="exercises" className="w-full my-8 text-center">
      <p className="font-bold text-3xl md:text-5xl mb-12">
        Awesome Exercises You <br /> Should Know
      </p>
      <div>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border text-lg font-semibold px-4 py-4 w-1/2"
            placeholder="Search Exercises, Bodypart"
          />
          <button
            type="submit"
            className="bg-rose-600 text-white px-8 py-4 text-lg font-semibold"
          >
            Search
          </button>
        </form>
      </div>
      <div className="mt-8">
        <HorizontalScrollbar>
          {bodyPartList.map((item) => (
            <BodyPart
              key={item.id || item}
              itemId={item.id || item}
              item={item}
              bodyPart={bodyPart}
              setBodyPart={setBodyPart}
              handleBodyPartChange={handleBodyPartChange}
            />
          ))}
        </HorizontalScrollbar>
      </div>
      <div className="text-left mt-16 px-2 lg:px-10 ">
        <p className="text-4xl border-b-4 border-rose-600 font-bold pb-4">
          {isSearched ? "Search Results" : "Recommanded Exercises"}
        </p>
        {searching ? (
          <Spinner text="Searching..." />
        ) : (
          <>
            {filteredExercises.length === 0 ? (
              <div className="w-full h-[60vh] text-center">
                <p className="font-bold text-rose-200  text-[200px] hidden lg:block">
                  Oops!
                </p>
                <p className="text-2xl font-semibold">No Exercises...</p>
              </div>
            ) : (
              <div className="flex flex-wrap justify-center mt-10">
                {filteredExercises.map((exercise) => (
                  <ExerciseCard key={exercise.id} exercise={exercise} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
