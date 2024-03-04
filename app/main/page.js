import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import SearchExercises from "@/components/SearchExercises";
import React from "react";

export default function App() {
  return (
    <div className="px-6">
      <Hero />
      <SearchExercises />
    </div>
  );
}
