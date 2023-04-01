import Link from "next/link";
export default function Item(item) {
  return (
    <>
      <Link href={`/${item.rt}`} target="_blank" className="">
        <div className=" flex flex-row  justify-between p-3 m-3 py-7 shadow-sm rounded-xl bg-blue-100 mx-24">
          <p className="text-2xl">{item.prompt}</p>
          <p className="text-1xl pl-4 min-[]:">{item.date.slice(0, 10)}</p>
        </div>
      </Link>
    </>
  );
}
