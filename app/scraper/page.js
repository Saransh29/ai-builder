"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Editor } from "@monaco-editor/react";

function debounce(func, wait) {
  let timeout;

  return function executedFunction(...args) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

const Page = () => {
  const [isScraping, setIsScraping] = useState(false);
  const [codes, setCodes] = useState({
    html: "",
    css: "",
  });
  const [temp, setTemp] = useState(false);

  const items = [];
  const name = "Temp name";

  const [url, setUrl] = useState("");
  const scrape = async () => {
    try {
      setIsScraping(true);
      const res = await fetch(
        `https://design-scraper.onrender.com/scraper`,
        // `http://localhost:5000/dummy`,
        // `http://localhost:5000/scraper`,
        // `http://localhost:5000/testing`,

        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            url: url,
          }),
        }
      );
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

  const handleContentUpdate = useCallback(
    debounce((event) => {
      if (event.data.type === "contentUpdate") {
        setCodes((prevCodes) => ({ ...prevCodes, html: event.data.html }));
      }
    }, 9500),
    []
  );

  useEffect(() => {
    window.addEventListener("message", handleContentUpdate);

    return () => {
      window.removeEventListener("message", handleContentUpdate);
    };
  }, [handleContentUpdate]);

  //   useEffect(() => {
  //     window.addEventListener("message", (event) => {
  //       if (event.data.type === "contentUpdate") {
  //         setCodes({ ...codes, html: event.data.html });
  //       }
  //     });

  //     return () => {
  //       window.removeEventListener("message", event);
  //     };
  //   }, [codes]);

  function wrapBodyContentv2(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const body = doc.querySelector("body");

    // get the element with id malana
    //   const malana = doc.getElementById("main-name");
    //   malana.innerHTML = `${name}`;

    //   const desc = doc.getElementById("main-description");
    //   desc.innerHTML = `Hi i am web dev based in Chennai ayo.`;

    //   const skills = doc.getElementById("main-skills");
    //   skills.innerHTML = `
    //   <p
    //   class="dark:bg-gray-200 bg-gray-400 px-4 py-2 mr-2 mt-2 text-black rounded font-semibold"
    // >
    //   Skill 1
    // </p>`;

    const elementsWithHref = body.querySelectorAll('[href^="/"], [src^="/"]');
    elementsWithHref.forEach((element) => {
      if (element.hasAttribute("href")) {
        const href = element.getAttribute("href");
        element.setAttribute("href", `${url}${href}`);
      }
      if (element.hasAttribute("src")) {
        const src = element.getAttribute("src");
        element.setAttribute("src", `${url}${src}`);
      }
    });

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

      function deleteElement(event) {
        event.preventDefault();
        event.stopPropagation();
        if (confirm('Are you sure you want to delete this element?')) {
          event.target.remove();
          window.parent.postMessage({
            type: 'contentUpdate',
            html: document.documentElement.outerHTML
          }, '*');
        }
      }
    
      function addDeleteElementListener(element) {
        element.addEventListener('contextmenu', deleteElement);
      }
      const elements = editableElement.querySelectorAll('*');
    elements.forEach(addDeleteElementListener);

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
