import React from "react";
import Editor from "./Editor";

const Home = () => {
  return (
    <div className="2xl:pt-10 lg:pt-20 md:pt-32 pt-20 md:px-10 mx-auto ">
      <div className="flex ">
        <div className="w-1/3">
          <Editor />
        </div>
        <div className="w-2/3 px-1">
          <div className="w-full h-full bg-gray-400 rounded-xl">
            {/* will put iframe here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
