import { useState, useEffect } from "react";
import { extractCode } from "@/utils/helper";
const systemMessage = {
  role: "system",
  //instructed that the code will wrap by ---starthtml--- ---endhtml---
  content:
    "Write code. Html should be without html, body, head and script tag. Wrap html code with ---starthtml--- ---endhtml---, css code with ---startcss--- ---endcss--- and javascript code ---startjs--- ---endjs---. And ---startcss--- ---endcss--- and javascript code ---startjs--- ---endjs--- will not be between  ---starthtml--- ---endhtml--- ",
};
export default function Generate({ handleGeneration }) {
  const [command, setCommand] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [content, setContent] = useState(null);
  const [reqbody, setReqbody] = useState(null);

  const [post, setPost] = useState({
    prompt: "",
    html: "",
    css: "",
    js: "",
  });

  const handleExtraction = (message) => {
    const { html, css, js } = extractCode(message);
    setPost({ prompt: command, html, css, js });
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
    if (content) {
      handleGeneration(content);
      handleExtraction(content);
    }
  }, [content]);

  useEffect(() => {
    if (post.html) {
      MongoPost();
    }
  }, [post.html]);

  const fetchMessages = async () => {
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
      setError(error);
    } finally {
      setIsGenerating(false);
      //   console.log(content);
    }
  };

  const MongoPost = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mongo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: post.prompt,
          html: post.html,
          css: post.css,
          js: post.js,
        }),
      });
      const data = await response.json();
      console.log(data);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <textarea
          className="h-32 p-4 border bg-blue-50 rounded-xl shadow-sm resize-none  "
          name="Idea"
          value={command}
          onChange={handleOnChangeCommand}
          placeholder="Enter your website Idea."
        ></textarea>
        {isGenerating ? (
          <button className="w-full bg-blue-300 p-2 rounded-xl" disabled>
            Generating
          </button>
        ) : (
          <button
            className="w-full bg-blue-300 p-2 rounded-xl"
            onClick={fetchMessages}
          >
            Generate
          </button>
        )}
      </div>
    </>
  );
}
