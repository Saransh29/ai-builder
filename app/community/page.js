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

  const getData = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/generations`);
    const temp = await res.json();
    const d = temp.data;
    setData(d);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="h-20"></div>

      <div className="h-10"></div>
      <div className="w-full ">
        <div className="grid grid-cols-fluid">
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

      <Footer />
    </div>
  );
}
