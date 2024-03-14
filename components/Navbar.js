"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Logo from "@/assets/images/Logo.png";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [authenticated, setAuthenticated] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [toggle, setToggle] = useState(false);

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
    <nav className="bg-white border-gray-200">
      <div className="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/">
          <Image src={Logo} alt="Logo" loading="lazy" />
        </Link>
        <button
          type="button"
          onClick={(e) => setToggle((prev) => !prev)}
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={`${toggle ? "block" : "hidden"} w-full md:block md:w-auto`}
          id="navbar-dropdown"
        >
          <ul className="flex flex-col items-baseline text-xl font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
            <Link
              href="/main"
              className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-rose-600 md:p-0"
            >
              Home
            </Link>
            <Link
              href="/main/#exercises"
              className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-rose-600 md:p-0"
            >
              Exercises
            </Link>
            {authenticated ? (
              <>
                <Link
                  href="/main/workout"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-rose-600 md:p-0"
                >
                  My Workout
                </Link>
                <p className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-rose-600 md:p-0">
                  {displayName}
                </p>
                <button
                  onClick={() => {
                    window.localStorage.removeItem("token");
                    window.localStorage.removeItem("displayName");
                    setAuthenticated("false");
                    router.push("/");
                  }}
                  className="bg-rose-600 rounded-lg mt-2 text-white px-3 py-2 text-lg font-semibold"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  router.push("/auth/login");
                }}
                className="bg-rose-600 rounded-lg block text-white px-3 py-2 text-lg font-semibold"
              >
                Sign In
              </button>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
