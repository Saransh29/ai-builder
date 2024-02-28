"use client";
import { useEffect, useState } from "react";
import Preview from "@/components/Preview";
import { updatePreviewv2 } from "@/utils/helper.js";
import Footer from "@/ui/Footer";

export default function GeneratedImage({ params }) {
  const { deployed } = params;
  const [codes, setCodes] = useState({
    html: "",
  });
  const getData = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/postv2/${deployed}`,
    );
    const temp = await res.json();
    const d = temp.data;
    setCodes({
      html: d.html,
    });
  };
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    updatePreviewv2(codes);
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
