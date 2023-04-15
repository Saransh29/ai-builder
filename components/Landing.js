"use client";
import { useSession, signIn } from "next-auth/react";
import Footer from "@/ui/Footer";
import { AiOutlineGithub, AiOutlineGoogle } from "react-icons/ai";

// Configuration for the uploader

export default function Landing() {
  const { data: session, status } = useSession();

  return (
    <div className="flex  mx-auto flex-col items-center justify-center pt-32 py-2 min-h-screen bg-gradient-to-b from-[#dbf4ff] to-[#fff1f1]">
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
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
          Build Websites with AI
        </div>
        <div
          style={{
            height: "10px",
          }}
        ></div>
        <div
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgb(121, 40, 202), rgb(255, 0, 128))",
            backgroundClip: "text",
            "-webkit-background-clip": "text",
            color: "transparent",
          }}
        >
          in &lt; 1min
        </div>
        <div
          style={{
            height: "10px",
          }}
        ></div>
        <div
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgb(255, 77, 77), rgb(249, 203, 40))",
            backgroundClip: "text",
            "-webkit-background-clip": "text",
            color: "transparent",
            fontSize: "25",
          }}
        >
          powered by ChatGPT-3.5-turbo
        </div>
      </div>

      <main className="flex flex-1 p-10 w-full flex-col items-center justify-center text-center px-4 mt-4 sm:mb-0 mb-8">
        {status === "authenticated" ? (
          <div>
            <a
              href="/beta"
              className="text-4xl bg-gray-200  font-semibold py-6 px-6 rounded-2xl flex items-center space-x-4"
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
                All Set. Start generating now.
              </div>
            </a>
          </div>
        ) : (
          <div>
            {" "}
            <div className="h-[250px] flex flex-col items-center space-y-6 max-w-[670px] -mt-8">
              <div className="max-w-xl text-gray-500">
                Sign in to save your creations.
              </div>
              <div className="flex flex-row space-x-4 ">
                <button
                  onClick={() => signIn("google")}
                  className="text-2xl bg-gray-200 text-black font-semibold py-3 px-6 rounded-2xl flex items-center space-x-2"
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
                    Sign in with{" "}
                  </div>
                  <AiOutlineGoogle
                    className="hover:-translate-y-1 transition-transform cursor-pointer text-neutral-500 dark:text-neutral-400"
                    size={30}
                  />
                </button>

                <button
                  onClick={() => signIn("github")}
                  className="text-2xl bg-gray-200 text-black font-semibold py-3 px-6 rounded-2xl flex items-center space-x-2"
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
                    Sign in with{" "}
                  </div>
                  <AiOutlineGithub
                    className="hover:-translate-y-1 transition-transform cursor-pointer text-neutral-500 dark:text-neutral-400"
                    size={30}
                  />
                </button>
              </div>
              <div>
                <a
                  href="/beta"
                  className="text-3xl bg-gray-200  font-semibold py-6 px-6 rounded-2xl flex items-center space-x-4"
                >
                  <div
                    style={{
                      backgroundImage:
                        "linear-gradient(90deg,rgb(121, 40, 202), rgb(255, 0, 128))",
                      backgroundClip: "text",
                      "-webkit-background-clip": "text",
                      color: "transparent",
                    }}
                  >
                    Checkout beta Now (2x faster and better)
                  </div>
                </a>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
