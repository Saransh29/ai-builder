"use client";
import Generation from "@/components/TestComponent";
import Preview from "@/components/Preview";
import Loader from "@/components/Loader";

import { useLoading } from "@/hooks/useLoading";

export default function Build() {
  const { loading } = useLoading();

  return (
    <div>
      <div className="2xl:pt-18 lg:pt-20 md:pt-20 pt-20 md:px-2 mx-auto ">
        <div className="flex ">
          <div className="w-1/3">
            <Generation />
          </div>
          <div className="w-2/3 px-1 shadow-md">
            <div className="w-full h-full shadow-md rounded-xl">
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
    </div>
  );
}
