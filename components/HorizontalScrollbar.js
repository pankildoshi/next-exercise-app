"use client";

import React, { useContext } from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";

import RightArrowIcon from "@/assets/icons/right-arrow.png";
import LeftArrowIcon from "@/assets/icons/left-arrow.png";
import Image from "next/image";

const LeftArrow = () => {
  const { scrollPrev } = useContext(VisibilityContext);

  return (
    <button onClick={() => scrollPrev()} className="right-arrow mx-2">
      <Image src={LeftArrowIcon} alt="left-arrow" />
    </button>
  );
};

const RightArrow = () => {
  const { scrollNext } = useContext(VisibilityContext);

  return (
    <button onClick={() => scrollNext()} className="left-arrow mx-2">
      <Image src={RightArrowIcon} alt="right-arrow" />
    </button>
  );
};

export default function HorizontalScrollbar({ children }) {
  return (
    <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
      {children}
    </ScrollMenu>
  );
}
