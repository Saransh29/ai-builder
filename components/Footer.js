import React from "react";
import { AiOutlineGithub, AiOutlineLinkedin } from "react-icons/ai";

export default function Footer() {
  return (
    <footer className=" w-full mx-auto max-w-3xl px-4 sm:px-6 md:max-w-7xl ">
      <hr className="w-full h-0.5 mx-auto mt-8 bg-neutral-200 border-0"></hr>
      <div className="mx-auto  p-4 flex flex-col text-center text-black md:flex-row md:justify-between">
        <div className="flex flex-row items-center justify-center space-x-1 text-black">
          © 2023 Saransh Bibiyan<a href="https://saransh.me" className="hover:underline"></a>
        </div>
        <div className="flex flex-row items-center justify-center space-x-2 mb-1">
          <a
            href="https://github.com/Saransh29"
            rel="noreferrer"
            target="_blank"
          >
            <AiOutlineGithub
              className="hover:-translate-y-1 transition-transform cursor-pointer text-black"
              size={30}
            />
          </a>

          <a
            href="https://www.linkedin.com/in/saransh-bibiyan/"
            rel="noreferrer"
            target="_blank"
          >
            <AiOutlineLinkedin
              className="hover:-translate-y-1 transition-transform cursor-pointer text-black"
              size={30}
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
