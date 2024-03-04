import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "@/assets/images/Logo.png";

export default function Footer() {
  return (
    <footer className="border-t-2 relative bottom-0">
      <div className="mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="flex justify-center items-baseline gap-2 sm:justify-start">
            <Link href="/">
              <Image src={Logo} alt="Logo" loading="lazy" />
            </Link>
            <span className="text-rose-600 text-3xl font-semibold">
              Exercise
            </span>
          </div>

          <p className="mt-4 text-center text-sm text-gray-500 lg:mt-0 lg:text-right">
            Copyright &copy; {new Date().getFullYear()}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
