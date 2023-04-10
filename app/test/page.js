"use client";
import React, { useState } from "react";

const Test = () => {
  const [data, setData] = useState(null);
  const [content, setContent] = useState(null);

  const getData = async () => {
    const response = await fetch("/api/gen/route", {
      method: "POST",
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: "hi hello there",
          },
        ],
      }),
    });
    const temp = await response.json();
    setContent(temp.choices[0].message.content);

    setData(temp);
  };

  return (
    <div className="text-center items-center ">
      <button className="h-screen w-1/2 bg-gray-400" onClick={getData}>
        DATA
      </button>
      {/* <div>{data}</div> */}
      {content}
    </div>
  );
};

export default Test;
