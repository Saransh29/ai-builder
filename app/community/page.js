"use client";
import Item2 from "@/components/item2";
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
  const [total, setTotal] = useState(0);

  const pages = new Array(numberOfPages).fill(null).map((v, i) => i);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_MONGO_API_URL}/pagination?page=${pageNumber}`)
      .then((response) => response.json())
      .then(({ total, totalPages, data }) => {
        setData(data);
        setNumberOfPages(totalPages);
        setTotal(total);
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
            Creations
          </div>
        </div>
      </div>
      <div className="w-full ">
        <div className="grid grid-cols-flow">
          {data.length > 0 &&
            data.map((item) => (
              <Item2
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
        <div class="flex flex-col items-center">
          <span class="text-sm text-gray-700 ">
            <span class="font-semibold px-1 text-gray-900 ">
              Showing {pageNumber * 12 + 1}
            </span>{" "}
            to
            <span class="font-semibold px-1 text-gray-900 ">
              {pageNumber * 12 + 12}
            </span>{" "}
            of
            <span class="font-semibold px-1 text-gray-900 "> {total}</span>
            Entries
          </span>
          <div class="inline-flex mt-2 xs:mt-0">
            <button
              onClick={gotoPrevious}
              class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-500 rounded-l hover:bg-gray-900"
            >
              <svg
                aria-hidden="true"
                class="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              Prev
            </button>
            <button
              onClick={gotoNext}
              class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-500 rounded-l hover:bg-gray-900 "
            >
              Next
              <svg
                aria-hidden="true"
                class="w-5 h-5 ml-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        {/* <button
          className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 "
          onClick={gotoPrevious}
        >
          Previous
        </button> */}
        {/* {pages.map((pageIndex) => (
          <button
            className={`px-3 py-2 text-blue-600 border border-gray-300 bg-${
              pageNumber === pageIndex ? "blue-300" : "blue-50"
            } hover:bg-blue-100 hover:text-blue-700 `}
            key={pageIndex}
            onClick={() => setPageNumber(pageIndex)}
          >
            {pageIndex + 1}
          </button>
        ))} */}
        {/* <button
          className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700  "
          onClick={gotoNext}
        >
          Next
        </button> */}
      </div>

      <Footer />
    </div>
  );
}
