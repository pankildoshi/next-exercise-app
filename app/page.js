"use client";

import { useRouter } from "next/navigation";
import App from "./main/page";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/main");
  });

  return (
    <>
      <Navbar />
      <App />
      <Footer />
    </>
  );
}
