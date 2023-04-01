import Footer from "@/components/Footer";
export default function About() {
  return (
    <div>
      <div className="h-20"></div>
      {/* <div className="w-full items-center justify-center text-center text-3xl px-6 pb-10">
        About page
      </div> */}
      <div>
        <div className="">
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
              WHAT
            </div>
            <div className="max-w-4xl text-2xl font-normal tracking-normal">
              <p>
                Developed a ChatGPT based Ai Builder which builds a complete
                website for you, in less than a minute and provides the code
                right there, for you to edit and style according to your needs.
              </p>
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
              WHY
            </div>
            <div className=" max-w-4xl text-2xl font-normal tracking-normal">
              <p>
                On the fly generation based on needs - The Platform which i am
                envisioning, the user just has to put in text based prompts to
                build websites. The skill/time required significantly drops.
                Although at this stage, this comes at a slight disadvantage in
                terms of the design and functionality. With quickly improving
                LLM’s this seems to be the most cost efficient way going
                forward.
              </p>
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
              HOW
            </div>
            <div className="max-w-4xl text-2xl font-normal tracking-normal">
              <p>{`I am using the chat mode of gpt-3.5-turbo model for the generation. `}</p>
              <p>{`I add a predefined
system role prompt :
{You are a web developer , Write code with descriptive sections, good design , full
functionality , vibrant colors. [Logic to separate html , css , js]}
with the user request and send the request to OpenAI. Retrieve the response and inject it into
an <iframe> to display it.`}</p>
            </div>
            <div
              style={{
                backgroundImage:
                  "linear-gradient(90deg, rgb(121, 40, 202), rgb(255, 0, 128))",
                backgroundClip: "text",
                "-webkit-background-clip": "text",
                color: "transparent",
              }}
            >
              FUTURE
            </div>
            <div className="max-w-4xl text-2xl font-normal tracking-normal">
              <ul className="list-outside ">
                <li>Chat functionality to add, edit, modify the website</li>
                <li>Implement a Credits based payment system with stripe.</li>
                <li>Improve the UI for better User Experience.</li>
                <li>Allow 3 free generations, Implement Rate-limiting.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col items-start justify-center  px-6">
        <Footer />
      </div>
    </div>
  );
}
