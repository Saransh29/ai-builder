"use client";
import Generatev2 from "@/components/Generatev2";
import Preview from "@/components/Preview";
import Loader from "@/ui/Loader";

import { useLoading } from "@/hooks/useLoading";

export default function Build() {
  const { loading } = useLoading();

  return (
    <>
      <div className="2xl:pt-18 lg:pt-20 md:pt-20 pt-20   ">
        <div className="flex flex-col ">
          <div className="w-full">
            <Generatev2 />
          </div>
          <div className="w-full p-2 shadow-md">
            <div className="w-full h-screen shadow-md rounded-xl">
              <Preview />
            </div>
          </div>
        </div>
      </div>{" "}
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-brightness-75">
          <Loader />
        </div>
      )}
    </>
  );
}
