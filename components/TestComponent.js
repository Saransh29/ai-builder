"use client";
import { useState, useEffect } from "react";
import { extractCode, updatePreview } from "../utils/helper.js";
import { useSession } from "next-auth/react";
import { useLoading } from "@/hooks/useLoading.js";
import Editor from "@monaco-editor/react";

const Generation = () => {
  const { data: session, status } = useSession();
  const { loading, setLoading } = useLoading();

  const [command, setCommand] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [content, setContent] = useState(null);
  const [savecount, setSavecount] = useState(0);
  const [manualSaves, setManualSaves] = useState(0);
  const [lStatus, setStatus] = useState("");

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

  const htmlhandler = (value, event) => {
    setCodes((prev) => ({
      ...prev,
      html: value,
    }));
  };
  const csshandler = (value, event) => {
    setCodes((prev) => ({
      ...prev,
      css: value,
    }));
  };
  const jshandler = (value, event) => {
    setCodes((prev) => ({
      ...prev,
      js: value,
    }));
  };

  // const handleCodes = (e) => {
  //   // e.preventDefault();
  //   // setCodes((prev) => ({
  //   //   ...prev,
  //   //   [e.target.name]: e.target.value,
  //   // }));
  // };

  const handleOnChangeCommand = (e) => {
    setCommand(e.target.value);
  };

  useEffect(() => {
    if (codes.html && lStatus === "changing") {
      MongoPost();
    }
  }, [codes.html]);

  const fetchMessages = async () => {
    setStatus("changing");
    setLoading(true);
    setSavecount(savecount + 1);
    try {
      setIsGenerating(true);
      const response = await fetch(
        // `${process.env.NEXT_PUBLIC_API_URL}/testing-api`,
        // `${process.env.NEXT_PUBLIC_API_URL}/GPT`,
        `${process.env.NEXT_PUBLIC_API_URL}/build`,
        // `/api/gen/route`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            command: command,
          }),
        }
      );
      const responseData = await response.json();
      setContent(responseData.choices[0].message.content);
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
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
          author: session?.user.email,
        }),
      });
      const temp = await response.json();
      const d = temp.data;
      // console.log(d._id);
      setId(d._id);
      setSavelink(`https://ai-builder.live/c/${d._id}`);
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
                      <div className="flex flex-row ">
                        <a
                          href="/build"
                          className="w-full bg-green-200 p-2 mr-2 my-1 rounded-xl text-center"
                        >
                          New generation
                        </a>
                        <button
                          className="w-full bg-blue-300 p-2 mr-2 my-1 rounded-xl"
                          onClick={UpdatePost}
                        >
                          Save Changes
                        </button>
                      </div>
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
              <Editor
                className="h-80 p-4 border border-gray-300 rounded-md shadow-sm resize-none "
                defaultLanguage="html"
                onChange={htmlhandler}
                value={codes.html}
              />
              {/* <textarea
                className="h-80 p-4 border border-gray-300 rounded-md shadow-sm resize-none "
                name="html"
                value={codes.html}
                onChange={handleCodes}
                placeholder="Enter HTML code"
              ></textarea> */}
            </div>
            <div className="flex flex-col gap-2">
              <h2
                className="px-4 py-2 text-white bg-black cursor-pointer rounded-xl"
                onClick={handleCollapse}
              >
                CSS
              </h2>
              <Editor
                className="h-80 p-4 border border-gray-300 rounded-md shadow-sm resize-none "
                defaultLanguage="css"
                onChange={csshandler}
                value={codes.css}
              />
              {/* <textarea
                className="h-80 p-4 border border-gray-300 rounded-md shadow-sm resize-none "
                name="css"
                value={codes.css}
                onChange={handleCodes}
                placeholder="Enter CSS code"
              ></textarea> */}
            </div>
            <div className="flex flex-col gap-2">
              <h2
                className="px-4 py-2 text-white bg-black cursor-pointer rounded-xl"
                onClick={handleCollapse}
              >
                JS
              </h2>
              <Editor
                className="h-80 p-4 border border-gray-300 rounded-md shadow-sm resize-none "
                defaultLanguage="javascript"
                onChange={jshandler}
                value={codes.js}
              />
              {/* <textarea
                className="h-80 p-4 border border-gray-300 rounded-md shadow-sm resize-none "
                name="js"
                value={codes.js}
                onChange={handleCodes}
                placeholder="Enter JS code"
              ></textarea> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Generation;
