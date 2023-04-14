import Link from "next/link";
export default function Item(item) {
  return (
    <Link href={`/c/${item.rt}`} target="_blank">
      <div className="mx-10 flex flex-col justify-center p-5">
        <div className="w-full h-[180px] overflow-hidden">
          <iframe
            srcDoc={`<style>${item.css}</style>${item.html}<script>${item.js}</script>`}
            // className="w-[28rem] h-96 border-0 transform scale-75"
            style={{
              width: "1400px",
              height: "700px",
              border: "0px",
              transform: "scale(0.3)",
              transformOrigin: "0px 0px",
            }}
            frameborder="0"
            scrolling="no"
          ></iframe>
        </div>

        <div className=" flex flex-col p-1 justify-between shadow-sm rounded-xl bg-blue-100 ">
          <p className="text-1xl pl-2">{item.prompt}</p>
          <p className="text-1xl pl-2">{item.date.slice(0, 10)}</p>
        </div>
      </div>
    </Link>
  );
}
