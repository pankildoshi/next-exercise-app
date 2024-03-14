import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React from "react";

export default function MainLayout({ children }) {
  return (
    <div className="flex flex-col h-screen justify-between">
      <div>
        <Navbar />
        {children}
      </div>
      <Footer />
    </div>
  );
}
