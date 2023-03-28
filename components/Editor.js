"use client";
import { useState, useEffect } from "react";
import Generate from "./Generate";
import { extractCode, updatePreview } from "../utils/helper.js";

const Editor = () => {
  const [codes, setCodes] = useState({
    html: "",
    css: "",
    js: "",
  });

  const handleGeneration = (message) => {
    const { html, css, js } = extractCode(message);
    setCodes({ html, css, js });
  };

  useEffect(() => {
    updatePreview(codes);
  }, [codes]);

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
            <Generate handleGeneration={handleGeneration} />

            <div className="flex flex-col gap-2">
              <h2 className="px-4 py-2 text-white bg-black cursor-pointer rounded-xl">
                HTML
              </h2>
              <textarea
                className="h-80 p-4 border border-gray-300 rounded-md shadow-sm resize-none "
                name="html"
                value={codes.html}
                onChange={handleCodes}
                placeholder="Enter HTML code"
              ></textarea>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="px-4 py-2 text-white bg-black cursor-pointer rounded-xl">
                CSS
              </h2>
              <textarea
                className="h-80 p-4 border border-gray-300 rounded-md shadow-sm resize-none "
                name="css"
                value={codes.css}
                onChange={handleCodes}
                placeholder="Enter CSS code"
              ></textarea>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="px-4 py-2 text-white bg-black cursor-pointer rounded-xl">
                JS
              </h2>
              <textarea
                className="h-80 p-4 border border-gray-300 rounded-md shadow-sm resize-none "
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
