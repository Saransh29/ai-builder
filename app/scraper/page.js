"use client";
import React, { useState, useEffect } from "react";
import { Editor } from "@monaco-editor/react";

const Page = () => {
  const [isScraping, setIsScraping] = useState(false);
  const [codes, setCodes] = useState({
    html: "",
    css: "",
  });
  const [temp, setTemp] = useState(false);

  const [url, setUrl] = useState("");
  const scrape = async () => {
    try {
      setIsScraping(true);
      const res = await fetch(`https://design-scraper.onrender.com/scraper`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: url,
        }),
      });
      const temp = await res.json();
      const temphtml = temp.scraped.design.html;
      const updatedHtml = wrapBodyContentv2(temphtml);

      setCodes({
        html: updatedHtml,
        css: temp.scraped.design.css,
      });
      //   console.log(temp);
    } catch (error) {
      alert(error);
    } finally {
      setIsScraping(false);
    }
  };
  const htmlhandler = (value) => {
    setCodes((prev) => ({
      ...prev,
      html: value,
    }));
  };
  useEffect(() => {
    window.addEventListener("message", (event) => {
      if (event.data.type === "contentUpdate") {
        setCodes({ ...codes, html: event.data.html });
      }
    });

    return () => {
      window.removeEventListener("message", event);
    };
  }, [codes]);
  //   console.log(codes.html);
  //   console.log(data);
  function wrapBodyContentv2(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const body = doc.querySelector("body");

    body.setAttribute("contentEditable", "true");

    const scriptElement = doc.createElement("script");
    scriptElement.textContent = `
      const editableElement = document.querySelector('body');
  
      editableElement.addEventListener('input', () => {
        window.parent.postMessage({
          type: 'contentUpdate',
          html: document.documentElement.outerHTML
        }, '*');
      });
    `;

    // Add the script element to the body
    body.appendChild(scriptElement);

    return doc.documentElement.outerHTML;
  }

  return (
    <>
      <div className="2xl:pt-18 lg:pt-20 md:pt-20 pt-20">
        <div className="flex flex-col rounded-xl items-center justify-center">
          <div className="flex flex-col gap-2 w-1/2 ">
            {isScraping ? (
              <textarea
                className="h-16 p-4 border bg-blue-50 rounded-xl shadow-sm resize-y  "
                name="Idea"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter the website you want to scrape."
                disabled
              ></textarea>
            ) : (
              <textarea
                className="h-16 p-4 border bg-blue-50 rounded-xl shadow-sm resize-y  "
                name="Idea"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter your website Idea."
              ></textarea>
            )}

            {isScraping ? (
              <button className="w-full bg-blue-300 p-2 rounded-xl" disabled>
                Scraping...
              </button>
            ) : (
              <div>
                <button
                  className="w-full bg-blue-300 p-2 mr-2 my-1 rounded-xl"
                  onClick={scrape}
                >
                  Scrape
                </button>
              </div>
            )}
            {/* <button
        className="w-full bg-blue-300 p-2 mr-2 my-1 rounded-xl"
        onClick={MongoPost}
      >
        MongoPost
      </button> */}
          </div>
          {codes.html && (
            <div className="flex flex-col w-screen gap-2 px-14">
              <h2
                className="px-28 py-2 text-white bg-black cursor-pointer rounded-xl"
                //   onClick={handleCollapse}
                onClick={() => setTemp(!temp)}
              >
                {temp ? "Hide" : "Show"} Code
              </h2>
              <Editor
                className={`h-96 px-4 py-2 border border-gray-300 rounded-md shadow-sm resize-none ${
                  temp ? "visible" : "hidden"
                }`}
                defaultLanguage="html"
                onChange={htmlhandler}
                value={codes.html}
              />
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col justify-center w-screen">
        <iframe
          srcDoc={`${codes.html}<style>${codes.css}</style>`}
          className="h-screen w-screen"
        ></iframe>
      </div>
    </>
  );
};

export default Page;
