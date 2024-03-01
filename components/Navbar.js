"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Logo from "@/assets/images/Logo.png";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [authenticated, setAuthenticated] = useState(false);
  const [displayName, setDisplayName] = useState("");

  const router = useRouter();

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      setAuthenticated(true);
      setDisplayName(window.localStorage.getItem("displayName"));
    } else {
      setAuthenticated(false);
    }
  }, [authenticated]);

  return (
    <div className="p-6 flex justify-between">
      <div className="flex gap-6 md:gap-12 items-center justify-evenly font-medium text-xl">
        <Link href="/">
          <Image src={Logo} alt="Logo" loading="lazy" />
        </Link>
        <Link href="/">Home</Link>
        <Link href="/#exercises">Exercises</Link>
      </div>
      <div className="flex gap-6 md:gap-12 items-center justify-evenly font-medium text-xl">
        {authenticated ? (
          <>
            <Link href="/workout">My Workout</Link>
            <p>{displayName}</p>
            <button
              onClick={() => {
                window.localStorage.removeItem("token");
                window.localStorage.removeItem("displayName");
                setAuthenticated("false");
                router.push("/");
              }}
              className="bg-rose-600 rounded-lg text-white px-4 py-2 text-lg font-semibold"
            >
              Sign Out
            </button>
          </>
        ) : (
          <button
            onClick={() => {
              router.push("/auth/login");
            }}
            className="bg-rose-600 rounded-lg text-white px-4 py-2 text-lg font-semibold"
          >
            Sign In
          </button>
        )}
      </div>
    </div>
  );
}
