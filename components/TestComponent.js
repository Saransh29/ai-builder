"use client";
import { useState, useEffect } from "react";
import { extractCode, updatePreview } from "../utils/helper.js";

const systemMessage = {
  role: "system",
  //instructed that the code will wrap by ---starthtml--- ---endhtml---
  content:
    "Write code. with descriptive sections, good design. Html should be without html, body, head and script tag. Wrap html code with ---starthtml--- ---endhtml---, css code with ---startcss--- ---endcss--- and javascript code ---startjs--- ---endjs---. And ---startcss--- ---endcss--- and javascript code ---startjs--- ---endjs--- will not be between  ---starthtml--- ---endhtml--- ",
};

const TestComponent = () => {
  const [command, setCommand] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [content, setContent] = useState(null);
  const [reqbody, setReqbody] = useState(null);
  const [savecount, setSavecount] = useState(0);
  const [manualSaves, setManualSaves] = useState(0);
  const [status, setStatus] = useState("");

  const [savelink, setSavelink] = useState("");
  const [id, setId] = useState("");
  const [codes, setCodes] = useState({
    html: "",
    css: "",
    js: "",
  });
  const [post, setPost] = useState({
    prompt: "",
  });

  const handleGeneration = (message) => {
    const { html, css, js } = extractCode(message);
    setPost({ prompt: command });
    setCodes({ html, css, js });
  };

  useEffect(() => {
    if (content) {
      handleGeneration(content);
    }
  }, [content]);

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

  const handleOnChangeCommand = (e) => {
    setCommand(e.target.value);
  };

  useEffect(() => {
    let apiMessages = {
      role: "user",
      content: command,
    };

    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [systemMessage, apiMessages],
    };
    setReqbody(apiRequestBody);
  }, [command]);

  useEffect(() => {
    if (codes.html && status === "changing") {
      MongoPost();
    }
  }, [codes.html]);

  useEffect(() => {
    MongoPost;
  });

  const fetchMessages = async () => {
    setStatus("changing");
    setSavecount(savecount + 1);
    try {
      setIsGenerating(true);
      const response = await fetch(
        // `${process.env.NEXT_PUBLIC_API_URL}/testing-api`,
        // `${process.env.NEXT_PUBLIC_API_URL}/GPT`,
        `${process.env.NEXT_PUBLIC_API_URL}/build`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reqbody),
        }
      );
      const responseData = await response.json();
      setContent(responseData.choices[0].message.content);
    } catch (error) {
      alert(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCollapse = (event) => {
    const clickedElement = event.target;
    const parentElement = clickedElement.nextElementSibling;

    if (parentElement.style.visibility == "hidden") {
      parentElement.style.height = "380px";
      parentElement.style.visibility = "visible";
    } else {
      parentElement.style.height = 0;
      parentElement.style.visibility = "hidden";
    }
  };

  const MongoPost = async () => {
    setSavecount(savecount + 1);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mongo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: command,
          html: codes.html,
          css: codes.css,
          js: codes.js,
        }),
      });
      const temp = await response.json();
      const d = temp.data;
      // console.log(d._id);
      setId(d._id);
      setSavelink(`https://ai-builder.live/${d._id}`);
      setStatus("changed");
    } catch (err) {
      alert(err);
    }
  };
  const UpdatePost = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/mongo/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: command,
            html: codes.html,
            css: codes.css,
            js: codes.js,
          }),
        }
      );
      const temp = await response.json();
    } catch (err) {
      alert(err);
    }
  };

  return (
    <>
      <div className="grid-cols-4">
        <div className="grid-span-4">
          <div className="flex flex-col gap-4 w-full p-4 bg-gray-200 rounded-xl">
            <div></div>

            <div className="flex flex-col gap-2">
              {isGenerating ? (
                <textarea
                  className="h-48 p-4 border bg-blue-50 rounded-xl shadow-sm resize-y  "
                  name="Idea"
                  value={command}
                  onChange={handleOnChangeCommand}
                  placeholder="Enter your website Idea."
                  disabled
                ></textarea>
              ) : (
                <textarea
                  className="h-48 p-4 border bg-blue-50 rounded-xl shadow-sm resize-y  "
                  name="Idea"
                  value={command}
                  onChange={handleOnChangeCommand}
                  placeholder="Enter your website Idea."
                ></textarea>
              )}

              {isGenerating ? (
                <button className="w-full bg-blue-300 p-2 rounded-xl" disabled>
                  Generating
                </button>
              ) : (
                <div>
                  <button
                    className="w-full bg-blue-300 p-2 mr-2 my-1 rounded-xl"
                    onClick={fetchMessages}
                    disabled
                  >
                    Generate
                  </button>
                  <div className="flex flex-col">
                    {savelink.length > 0 ? (
                      <a
                        className="w-full rounded-xl bg-white p-1 my-1 text-center "
                        href={savelink}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {savelink}
                      </a>
                    ) : null}
                    {savelink.length > 0 ? (
                      <button
                        className="w-full bg-blue-300 p-2 mr-2 my-1 rounded-xl"
                        onClick={UpdatePost}
                      >
                        Save Changes
                      </button>
                    ) : null}
                  </div>
                  {/* {manualSaves < 5 ? (
              <p className="p-2 w-full ">
                1st generation is automatically saved, save your improvements.
              </p>
            ) : (
              <p className="p-2 w-full ">You can only save maximum 5 sites.</p>
            )} */}
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <h2
                className="px-4 py-2 text-white bg-black cursor-pointer rounded-xl"
                onClick={handleCollapse}
              >
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
              <h2
                className="px-4 py-2 text-white bg-black cursor-pointer rounded-xl"
                onClick={handleCollapse}
              >
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
              <h2
                className="px-4 py-2 text-white bg-black cursor-pointer rounded-xl"
                onClick={handleCollapse}
              >
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
export default TestComponent;
