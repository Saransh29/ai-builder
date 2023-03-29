import Link from "next/link";
export default function Item(item) {
  return (
    <div className=" ">
      <Link href={`/${item.rt}`}>
        <div className="text-2xl text-start p-3 m-3 py-7 shadow-sm rounded-xl bg-blue-100 mx-24">
          {item.prompt}
        </div>
      </Link>
    </div>
  );
}
