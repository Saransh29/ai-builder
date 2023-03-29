import React from "react";
import Footer from "../components/Footer";
import Home from "../components/Home";
const page = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="h-20"></div>
      <div className="flex-grow px-2 place-items-center ">
        <Home />
      </div>
      <Footer />
    </div>
  );
};

export default page;
