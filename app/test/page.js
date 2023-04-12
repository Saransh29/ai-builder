"use client";
import Item from "@/components/item";
import { useState, useEffect } from "react";
import Footer from "@/components/Footer";

export async function generateStaticParams() {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/generations`);
  const res = await data.json();
  return res.data.map((test) => ({
    gen: toString(test._id),
  }));
}

export default function About() {
  const [data, setData] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);

  const pages = new Array(numberOfPages).fill(null).map((v, i) => i);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/pagination?page=${pageNumber}`)
      .then((response) => response.json())
      .then(({ totalPages, data }) => {
        setData(data);
        setNumberOfPages(totalPages);
      });
  }, [pageNumber]);

  // const getData = async () => {
  //   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/generations`);
  //   const temp = await res.json();
  //   const d = temp.data;
  //   setData(d);
  // };

  // useEffect(() => {
  //   getData();
  // }, []);

  const gotoPrevious = () => {
    setPageNumber(Math.max(0, pageNumber - 1));
  };

  const gotoNext = () => {
    setPageNumber(Math.min(numberOfPages - 1, pageNumber + 1));
  };

  return (
    <div>
      <div className="h-20"></div>
      <div className="w-full">
        <div
          style={{
            display: "flex",
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
            Testing
          </div>
        </div>
      </div>
      <div className="w-full ">
        <div className="grid grid-cols-flow">
          {data.length > 0 &&
            data.map((item) => (
              <Item
                rt={item._id}
                key={item._id}
                prompt={item.prompt}
                html={item.html}
                css={item.css}
                js={item.js}
                date={item.date}
              />
            ))}
        </div>
      </div>
      <div className="h-10"></div>
      <div className=" w-full justify-center text-center inline-flex -space-x-px">
        <button
          className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 "
          onClick={gotoPrevious}
        >
          Previous
        </button>
        {pages.map((pageIndex) => (
          <button
            className={`px-3 py-2 text-blue-600 border border-gray-300 bg-${
              pageNumber === pageIndex ? "blue-300" : "blue-50"
            } hover:bg-blue-100 hover:text-blue-700 `}
            key={pageIndex}
            onClick={() => setPageNumber(pageIndex)}
          >
            {pageIndex + 1}
          </button>
        ))}
        <button
          className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700  "
          onClick={gotoNext}
        >
          Next
        </button>
      </div>

      <Footer />
    </div>
  );
}
