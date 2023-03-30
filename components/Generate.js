import { useState, useEffect } from "react";
import { extractCode } from "@/utils/helper";
const systemMessage = {
  role: "system",
  //instructed that the code will wrap by ---starthtml--- ---endhtml---
  content:
    "Write code. Html should be without html, body, head and script tag. Wrap html code with ---starthtml--- ---endhtml---, css code with ---startcss--- ---endcss--- and javascript code ---startjs--- ---endjs---. And ---startcss--- ---endcss--- and javascript code ---startjs--- ---endjs--- will not be between  ---starthtml--- ---endhtml--- ",
};
export default function Generate(props) {
  const handleGeneration = props.handleGeneration;
  // const { codes } = props;

  const [command, setCommand] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [content, setContent] = useState(null);
  const [reqbody, setReqbody] = useState(null);
  const [savecount, setSavecount] = useState(0);
  const [manualSaves, setManualSaves] = useState(0);

  const [savelink, setSavelink] = useState("");

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

  const handleSaveinput = (e) => {
    setSavelink(e.target.value);
  };

  // console.log(post.html);

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

  // console.log(post.html);

  // useEffect(() => {
  //   if (post.html) {
  //     const interval = setInterval(() => {
  //       parentToChild();
  //     }, 6000);
  //     return () => {
  //       clearInterval(interval);
  //     };
  //   }
  // }, [post.html]);

  useEffect(() => {
    if (content) {
      handleGeneration(content);
      handleExtraction(content);
    }
  }, [content]);

  useEffect(() => {
    if (post.html && savecount < 5) {
      MongoPost();
    }
  }, [post.html]);

  const fetchMessages = async () => {
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
      //   console.log(content);
    }
  };
  const HandleSave = async () => {
    setManualSaves(manualSaves + 1);
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
      const temp = await response.json();
      const d = temp.data;
      // console.log(d._id);
      setSavelink(`https://ai-builder-gules.vercel.app/${d._id}`);
    } catch (err) {
      alert(err);
    }
  };

  // console.log(post.html);

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
      const temp = await response.json();
      const d = temp.data;
      // console.log(d._id);
      setSavelink(`https://ai-builder-gules.vercel.app/${d._id}`);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <textarea
          className="h-48 p-4 border bg-blue-50 rounded-xl shadow-sm resize-y  "
          name="Idea"
          value={command}
          onChange={handleOnChangeCommand}
          placeholder="Enter your website Idea."
        ></textarea>
        {/* {codes} */}
        {/* <button onClick={parentToChild}>Click me to set data</button> */}
        {/* <div> {parentToChild}</div> */}
        {isGenerating ? (
          <button className="w-full bg-blue-300 p-2 rounded-xl" disabled>
            Generating
          </button>
        ) : (
          <div>
            <button
              className="w-full bg-blue-300 p-2 mr-2 my-2 rounded-xl"
              onClick={fetchMessages}
            >
              Generate
            </button>
            <div className="flex flex-row">
              {/* {manualSaves < 5 ? (
                <button
                  className="w-1/3 bg-blue-300 p-2 mr-2 rounded-xl"
                  onClick={HandleSave}
                >
                  Save
                </button>
              ) : (
                <button
                  className="w-1/3 bg-gray-300 p-2 mr-2 rounded-xl"
                  onClick={HandleSave}
                  disabled
                >
                  Save
                </button>
              )} */}

              {/* <textarea
                className="w-full rounded-xl"
                value={savelink}
              ></textarea> */}
              <a
                className="w-full rounded-xl bg-white p-1 text-center "
                href={savelink}
                target="_blank"
                rel="noreferrer"
              >
                {savelink?.length > 0 ? savelink : "Website Link"}
              </a>
              {/* <input className="w-full rounded-xl" value={savelink}></input> */}
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
    </>
  );
}
