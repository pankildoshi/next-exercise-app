"use client";

import Link from "next/link";
import React from "react";
import Logo from "@/assets/images/Logo.png";
import Image from "next/image";

import { signIn, signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <div className="p-6 flex justify-between">
      <div className="flex gap-6 md:gap-12 items-center justify-evenly font-medium text-xl">
        <Link href="/">
          <Image src={Logo} alt="Logo" loading="lazy" />
        </Link>
        <Link href="/">Home</Link>
        <Link href="/#exercises">Exercises</Link>

        {status === "authenticated" ? (
          <>
            <Link href="/workout">My Workout</Link>
            <p>{session.user?.name}</p>
            <button
              onClick={() => signOut("google")}
              className="bg-rose-600 rounded-lg text-white px-4 py-2 text-lg font-semibold"
            >
              Sign Out
            </button>
          </>
        ) : (
          <button
            onClick={() => signIn("google")}
            className="bg-rose-600 rounded-lg text-white px-4 py-2 text-lg font-semibold"
          >
            Sign In
          </button>
        )}
      </div>
    </div>
  );
}
