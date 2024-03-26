"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import Spinner from "./Spinner";

export default function Login() {
  let router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [statusError, setStatusError] = useState("");
  const [signing, setSigning] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Password requirements
    const requirements = [
      password.length >= 8,
      /[A-Z]/.test(password),
      /[a-z]/.test(password),
      /\d/.test(password),
    ];

    const isValid = requirements.every(Boolean);

    if (!isValid) {
      setStatusError(
        "Password length must be atleast 8 characters and must contain at least 1 uppercase letter, 1 lowercase letter and 1 digit."
      );
      return;
    }

    setSigning(true);
    fetch(`/api/auth/login`, {
      method: "POST",
      crossDomain: true,
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setStatusError("");
          window.localStorage.setItem("token", data.user._id);
          window.localStorage.setItem(
            "displayName",
            data.user.firstName + " " + data.user.lastName
          );
          setSigning(false);
          toast.success("You are signed in successfully!", {
            className: "text-xl",
          });
          router.replace("/");
        } else {
          setSigning(false);
          setStatusError(data.message);
        }
      });
  };

  return (
    <>
      {signing && (
        <Spinner
          text="signing in..."
          className={`fixed inset-x-0 top-8 mx-auto`}
        />
      )}
      <div className="min-h-screen flex flex-col justify-center sm:px-6 lg:px-8">
        <div className="my-8 sm:mx-auto sm:w-full sm:max-w-xl">
          <div className="bg-white py-8 px-4 shadow-2xl sm:rounded-lg sm:px-10">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Sign in to your account
              </h2>
              <p className="mt-2 mb-12 text-center text-xl text-gray-600 max-w">
                Or{" "}
                <Link
                  href="/auth/register"
                  className="font-medium text-rose-600 hover:text-rose-500"
                >
                  Sign Up
                </Link>
              </p>
            </div>
            <form className="space-y-6 mt-8" onSubmit={handleSubmit}>
              {statusError !== "" && (
                <div>
                  <p className="text-red-600">{statusError}</p>
                </div>
              )}
              <div>
                <label
                  htmlFor="email"
                  className="block text-xl font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-lg"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-xl font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    autoComplete="current-password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-lg"
                    placeholder="Enter your password"
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-xl font-semibold rounded-md text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
