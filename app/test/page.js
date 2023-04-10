"use client";
import React, { useState } from "react";
import { useLoading } from "@/hooks/useLoading";
import Loader from "@/components/Loader";

const Test = () => {
  const [data, setData] = useState(null);
  const [content, setContent] = useState(null);
  const { loading, setLoading } = useLoading();

  const getData = async () => {
    setLoading(!loading);
    // call this api after 5 seconds

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/testing-api`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const temp = await response.json();
    setContent(temp.choices[0].message.content);

    setData(temp);
  };

  return (
    <div className="relative text-center items-center">
      <button className="text-5xl pt-40 bg-gray-400" onClick={getData}>
        DATA
      </button>
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center ">
          <Loader />
        </div>
      )}

      {content}
    </div>
  );
};

export default Test;
