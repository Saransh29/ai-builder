import React from "react";

const Floating2 = () => {
  return (
    <div className=" ">
      <div className="fixed bottom-0 right-0 md:visible invisible rounded-xl">
        <div className="p-5 rounded-xl flex flex-row items-center justify-center space-x-2">
          <a
            className="hover:-translate-y-1 transition-transform cursor-pointer"
            rel="noreferrer"
            target="_blank"
            href="https://ai-builder.live"
          >
            <div className="flex flex-row justify-center items-center rounded-xl bg-gray-200">
              {" "}
              <p className="p-2 text-2xl"> Built by Ai-Builder</p>
              <span></span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Floating2;
