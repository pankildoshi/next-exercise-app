import React from "react";
import Image from "next/image";
import HeroBannerImage from "@/assets/images/banner.png";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="mb-12 grid grid-cols-2 max-h-screen overflow-hidden">
      <div className="col-span-1">
        <p className="text-rose-600 font-bold text-3xl md:text-5xl mt-12">
          Fitness Club
        </p>
        <p className="my-8 font-bold text-[48px] md:text-[68px]">
          Sweat, Smile <br />
          And Repeat
        </p>
        <p className="text-lg md:text-2xl font-medium">
          Check out the most effective exercises personalized to you
        </p>
        <div className="mt-8">
          <Link
            href="#exercises"
            className="text-white bg-rose-600 font-semibold text-lg rounded-xl py-4 px-3"
          >
            Explore Exercises
          </Link>
        </div>
        <p className="font-bold text-rose-600 opacity-10 text-[200px] hidden lg:block">
          Exercise
        </p>
      </div>
      <Image
        src={HeroBannerImage}
        alt="Banner Image"
        loading="lazy"
        className="z-10 hidden lg:block max-h-screen"
      />
    </div>
  );
}
