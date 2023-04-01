import Link from "next/link";
export default function Creation(item) {
  return (
    <div className="">
      <div className="text-2xl flex flex-row  justify-between p-3 m-3 py-7 shadow-sm rounded-xl bg-blue-100 mx-24">
        <div>{item.prompt}</div>
        <div className="flex flex-row ">
          {" "}
          <Link target="_blank" href={`/${item.rt}`}>
            <div className="p-2 mx-2 bg-blue-300 rounded-xl">View</div>
          </Link>
          {/* <div className="p-2 mx-2 bg-blue-300 rounded-xl">Edit</div> */}
        </div>
      </div>
    </div>
  );
}
