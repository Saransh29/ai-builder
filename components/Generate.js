import { useState, useEffect } from "react";

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

  const fetchMessages = async () => {
    try {
      setIsGenerating(true);
      const response = await fetch(
        // "https://api.openai.com/v1/chat/completions",
        // "http://localhost:5000/GPT",
        // "http://localhost:5000/testing-api",
        // "http://localhost:5000/build",
        // "https://funny-tan-scorpion.cyclic.app/GPT",
        "https://funny-tan-scorpion.cyclic.app/build",
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
  useEffect(() => {
    if (content) {
      handleGeneration(content);
    }
  }, [content]);

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
