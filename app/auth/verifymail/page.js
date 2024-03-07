"use client";

import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function VerifyMail() {
  const [message, setMessage] = useState("");
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    fetch("/api/auth/verifyMail", {
      method: "POST",
      body: JSON.stringify({
        token,
      }),
    })
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  return (
    <div className="text-2xl font-semibold flex justify-center items-center p-24">
      <p>{message}</p>
    </div>
  );
}
