"use client";
import { useState } from "react";

const Editor = () => {
  const [idea, setIdea] = useState("");
  const [codes, setCodes] = useState({
    html: "",
    css: "",
    js: "",
  });

  const handleIdea = (e) => {
    e.preventDefault();
    setIdea(e.target.value);
  };

  const handleCodes = (e) => {
    e.preventDefault();
    setCodes((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <div className="grid-cols-4">
        <div className="grid-span-4">
          <div className="flex flex-col gap-4 w-full p-4 bg-gray-200 rounded-xl">
            <div className="flex flex-col gap-2">
              <textarea
                className="h-72 p-4 border bg-blue-50 rounded-xl shadow-sm resize-none text-lg font-medium"
                name="Idea"
                value={idea}
                onChange={handleIdea}
                placeholder="Enter your website Idea."
              ></textarea>
              <button className="w-full bg-blue-300 p-2 rounded-xl">
                Generate
              </button>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="px-4 py-2 text-white bg-black cursor-pointer">
                HTML
              </h2>
              <textarea
                className="h-80 p-4 border border-gray-300 rounded-md shadow-sm resize-none text-lg font-medium"
                name="html"
                value={codes.html}
                onChange={handleCodes}
                placeholder="Enter HTML code"
              ></textarea>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="px-4 py-2 text-white bg-black cursor-pointer">
                CSS
              </h2>
              <textarea
                className="h-80 p-4 border border-gray-300 rounded-md shadow-sm resize-none text-lg font-medium"
                name="css"
                value={codes.css}
                onChange={handleCodes}
                placeholder="Enter CSS code"
              ></textarea>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="px-4 py-2 text-white bg-black cursor-pointer">
                JS
              </h2>
              <textarea
                className="h-80 p-4 border border-gray-300 rounded-md shadow-sm resize-none text-lg font-medium"
                name="js"
                value={codes.js}
                onChange={handleCodes}
                placeholder="Enter JS code"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Editor;
