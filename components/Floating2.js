import React from "react";

const Floating2 = () => {
  return (
    <div className=" ">
      <div className="fixed bottom-0 right-0 md:visible invisible rounded-xl">
        <div className="w-screen p-5 rounded-xl flex flex-row items-center justify-center space-x-2">
          <a
            className="hover:-translate-y-1 transition-transform cursor-pointer"
            rel="noreferrer"
            target="_blank"
            href="https://ai-builder.live"
          >
            <div className="flex flex-row justify-between  rounded-xl bg-gray-200">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  fontSize: 30,
                  letterSpacing: -2,
                  fontWeight: 700,
                  textAlign: "center",
                  padding: "0.5rem",
                }}
              >
                <div
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, rgb(121, 40, 202), rgb(255, 0, 128))",
                    backgroundClip: "text",
                    "-webkit-background-clip": "text",
                    color: "transparent",
                  }}
                >
                  Built by Ai-Builder
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  fontSize: 30,
                  letterSpacing: -2,
                  fontWeight: 700,
                  textAlign: "center",
                  padding: "0.5rem",
                  paddingLeft: "1rem",
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
                  Build yours Now.
                </div>
              </div>
              <span></span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Floating2;
