import React from "react";

const Billing = () => {
  return (
    <div className="w-full bg-gray-200 h-screen">
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          fontSize: 60,
          letterSpacing: -2,
          fontWeight: 700,
          textAlign: "center",
        }}
      >
        <div
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgb(0, 124, 240), rgb(0, 223, 216))",
            backgroundClip: "text",
            "-webkit-background-clip": "text",
            color: "transparent",
          }}
        >
          This Project is free.
        </div>
        <div
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgb(121, 40, 202), rgb(255, 0, 128))",
            backgroundClip: "text",
            "-webkit-background-clip": "text",
            color: "transparent",
          }}
        >
          <a href="https://github.com/Saransh29/ai-builder" target="_blank">
            Checkout the source code on Github.
          </a>
        </div>
        <div
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgb(255, 77, 77), rgb(249, 203, 40))",
            backgroundClip: "text",
            "-webkit-background-clip": "text",
            color: "transparent",
            fontSize: "25",
          }}
        >
          <a
            href="https://www.linkedin.com/in/saransh-bibiyan/"
            target="_blank"
          >
            Connect with me on LinkedIn.
          </a>
        </div>
      </div>
    </div>
  );
};

export default Billing;
