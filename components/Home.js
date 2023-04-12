"use client";
import React from "react";

import { useSession } from "next-auth/react";
import Landing from "@/components/Landing";

const Home = () => {
  const { data: session, status } = useSession();
  return (
    <div>
      <Landing />
    </div>
  );
};

export default Home;
