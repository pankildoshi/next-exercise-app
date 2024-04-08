"use client";

import React, { useState } from "react";
import UserContext from "@/utils/UserContext";

export default function Provider({ children }) {
  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
