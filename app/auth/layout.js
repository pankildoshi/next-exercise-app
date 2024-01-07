import React from "react";

export default function AuthLayout({ children }) {
  return (
    <section className="absolute top-0 left-0 min-h-screen min-w-full bg-white">
      {children}
    </section>
  );
}
