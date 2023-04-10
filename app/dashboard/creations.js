import React, { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import Creation from "./creation";

const Creations = () => {
  const [data, setData] = useState([]);
  const { data: session, status } = useSession();

  const getData = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/mongo/${session.user.email}`
    );
    const temp = await res.json();
    const d = temp.data;
    setData(d);
  };

  useEffect(() => {
    if (status === "authenticated") {
      getData();
    }
  }, [status]);

  return (
    <div className="w-full bg-gray-200 h-full">
      <div className="w-full bg-gray-200 ">
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
        {status === "authenticated" ? (
          <div className="grid grid-cols-fluid">
            {data.length > 0 &&
              data.map((item) => (
                <Creation
                  rt={item._id}
                  key={item._id}
                  prompt={item.prompt}
                  html={item.html}
                  css={item.css}
                  js={item.js}
                />
              ))}
          </div>
        ) : (
          <div>Sign in to Checkout your Creations.</div>
        )}
      </div>
    </div>
  );
};

export default Creations;
