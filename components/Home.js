"use client";
import React from "react";
import Preview from "./Preview";
import TestComponent from "./TestComponent";
import Build from "@/app/build/page";
import { useSession } from "next-auth/react";

const Home = () => {
  const { data: session, status } = useSession();
  return (
    <div>
      {status === "unauthenticated" ? (
        <Build />
      ) : (
        <div className="2xl:pt-18 lg:pt-20 md:pt-20 pt-20 md:px-2 mx-auto ">
          <div className="flex ">
            <div className="w-1/3">
              <TestComponent />
            </div>
            <div className="w-2/3 px-1 shadow-md">
              <div className="w-full h-full shadow-md rounded-xl">
                <Preview />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
