"use client";
import { useState, useEffect } from "react";
import { updatePreviewv2 } from "../utils/helper.js";
import { useSession } from "next-auth/react";
import { useLoading } from "@/hooks/useLoading.js";
import Editor from "@monaco-editor/react";

const Generatev2 = () => {
  const { data: session, status } = useSession();
  const { loading, setLoading } = useLoading();

  const [command, setCommand] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [content, setContent] = useState(null);
  const [lStatus, setStatus] = useState("");
  const [temp, setTemp] = useState(false);

  const [savelink, setSavelink] = useState("");
  const [id, setId] = useState("");
  const [codes, setCodes] = useState({
    html: "",
  });
  const [post, setPost] = useState({
    prompt: "",
  });

  //   useEffect(() => {
  //     if (content) {
  //       handleGeneration(content);
  //     }
  //   }, [content]);

  useEffect(() => {
    updatePreviewv2(codes);
  }, [codes]);

  const htmlhandler = (value, event) => {
    setCodes((prev) => ({
      ...prev,
      html: value,
    }));
  };

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
    try {
      setIsGenerating(true);
      const response = await fetch(
        // `${process.env.NEXT_PUBLIC_API_URL}/testing-api`,
        `${process.env.NEXT_PUBLIC_API_URL}/test`,
        // `${process.env.NEXT_PUBLIC_API_URL}/dummy`,
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
      setPost({ prompt: command });
      setCodes({ html: responseData.choices[0].message.content });
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
      setIsGenerating(false);
    }
  };

  const MongoPost = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_MONGO_API_URL}/create`,
        // "https://funny-tan-scorpion.cyclic.app/api/v1/mongo",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: command,
            html: codes.html,
            author: session?.user.email,
          }),
        }
      );
      const temp = await response.json();
      const d = temp.data;
      // console.log(d._id);
      setId(d._id);
      setSavelink(`https://ai-builder.live/v2/${d._id}`);
      //   setSavelink(`http://localhost:3000/v2/${d._id}`);

      setStatus("changed");
    } catch (err) {
      alert(err);
    }
  };
  const UpdatePost = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_MONGO_API_URL}/mongo/${id}`,
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
      <div className="flex flex-col rounded-xl items-center justify-center">
        <div className="flex flex-col gap-2 w-1/2 ">
          {isGenerating ? (
            <textarea
              className="h-16 p-4 border bg-blue-50 rounded-xl shadow-sm resize-y  "
              name="Idea"
              value={command}
              onChange={handleOnChangeCommand}
              placeholder="Enter your website Idea."
              disabled
            ></textarea>
          ) : (
            <textarea
              className="h-16 p-4 border bg-blue-50 rounded-xl shadow-sm resize-y  "
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
                      href="/beta"
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
    </>
  );
};
export default Generatev2;
