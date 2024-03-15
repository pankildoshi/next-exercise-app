"use client";

import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import ExerciseCard from "./ExerciseCard";

export default function PaginatedExercises({ items }) {
  const [itemOffset, setItemOffset] = useState(0);

  const itemsPerPage = 9;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      <div className="flex flex-wrap justify-center mt-10 mb-8">
        {currentItems.map((exercise) => (
          <ExerciseCard key={exercise.id} exercise={exercise} />
        ))}
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="Next"
        previousLabel="Prev"
        pageRangeDisplayed={3}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        renderOnZeroPageCount={null}
        containerClassName="flex flex-wrap gap-4 justify-center items-center"
        pageClassName="p-4 text-rose-600 border"
        nextLinkClassName="p-4 text-rose-600 border"
        previousLinkClassName="p-4 text-rose-600 border"
        activeClassName="text-white bg-rose-600"
      />
    </>
  );
}
