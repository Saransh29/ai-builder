import React from "react";
import Editor from "./Editor";
import Preview from "./Preview";
import TestComponent from "./TestComponent";

const Home = () => {
  return (
    <div className="2xl:pt-18 lg:pt-20 md:pt-20 pt-20 md:px-2 mx-auto ">
      <p className="w-full text-center text-2xl">
        Ran Out of OpenAI Credits. Working on fixing it.
      </p>
      <p className="w-full text-center text-2xl">
        Checkout{" "}
        <a className="text-blue-500" href="/community">
          community{" "}
        </a>{" "}
        for now.
      </p>
      <p className="w-full text-center text-2xl">
        Checkout my other
        <a className="text-blue-500" href="https://saransh.me/#projects">
          projects
        </a>
        .
      </p>
      <div className="flex ">
        <div className="w-1/3">
          {/* <Editor /> */}
          <TestComponent />
        </div>
        <div className="w-2/3 px-1 shadow-md">
          <div className="w-full h-full shadow-md rounded-xl">
            <Preview />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
