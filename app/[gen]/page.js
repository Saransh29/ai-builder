"use client";
import { useEffect, useState } from "react";
import Preview from "@/components/Preview";
import { updatePreview } from "@/utils/helper.js";

export default function GeneratedImage({ params }) {
  const [prompt, setPrompt] = useState("");
  const { gen } = params;
  const [codes, setCodes] = useState({
    html: "",
    css: "",
    js: "",
  });
  const getData = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/${gen}`);
    const temp = await res.json();
    const d = temp.data;
    setPrompt(d[0].prompt);
    setCodes({
      html: d[0].html,
      css: d[0].css,
      js: d[0].js,
    });
  };
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    updatePreview(codes);
  }, [codes]);

  return (
    <div>
      <div className="p-10">
        <div className="h-10"></div>
        <div className="flex flex-row justify-between bg-blue-100  p-3 m-3  rounded-xl">
          <p className="text-2xl text-center p-1 font-bold  ">{prompt}</p>
          <a
            className="text-1xl mx-10 text-center font-medium p-1 rounded-md bg-green-200  "
            href={`/c/${gen}`}
          >
            deployed
          </a>
        </div>
        {/* <p className="text-2xl text-center font-bold p-3 m-3 shadow-sm rounded-xl bg-blue-100 ">
          {prompt}
        </p>
        <div className="">
          <a
            className="text-1xl mx-10 text-center font-medium p-3 m-2 rounded-md bg-green-200 "
            href={`/c/${gen}`}
          >
            deployed
          </a>
        </div> */}

        <div className="w-full h-screen justify-center shadow-2xl">
          <Preview />
        </div>
      </div>
    </div>
  );
}
