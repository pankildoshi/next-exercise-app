import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React from "react";

export default function MainLayout({ children }) {
  return (
    <div className="">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
