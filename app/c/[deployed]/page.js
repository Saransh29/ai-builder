"use client";
import { useEffect, useState } from "react";
import Preview from "@/components/Preview";
import { updatePreview } from "@/utils/helper.js";
import Footer from "@/shared/Footer";

export default function GeneratedImage({ params }) {
  const { deployed } = params;
  const [codes, setCodes] = useState({
    html: "",
    css: "",
    js: "",
  });
  const getData = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/post/${deployed}`
    );
    const temp = await res.json();
    const d = temp.data;
    setCodes({
      html: d[0].html,
      css: d[0].css,
      js: d[0].js,
    });
  };
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    updatePreview(codes);
  }, [codes]);

  return (
    <div>
      <div className="">
        <div className=""></div>
        <div className="w-full h-screen justify-center shadow-2xl">
          <Preview />
        </div>
      </div>
      <div className="md:px-56">
        <Footer />
      </div>
    </div>
  );
}
