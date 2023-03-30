import Footer from "@/components/Footer";
export default function About() {
  return (
    <div>
      <div className="h-20"></div>
      <div className="w-full items-center justify-center text-center text-3xl px-6 pb-10">
        About page
      </div>
      <div className="w-full flex flex-col items-start justify-center  px-6">
        <ul className="list-outside list-disc ml-6 px-10">
          {/* <li className="text-1xl max-w-3xl pb-4">
            <a
              className="text-blue-500"
              href="https://xyz.com"
              rel="noreferrer"
              target="_blank"
            >
              (link){" "}
            </a>
            .
          </li> */}
          <li className="text-1xl max-w-4xl pb-4">
            Developed a ChatGPT based Ai Builder which builds a complete website
            for you, in less than a minute and provides the code right there,
            for you to edit and style according to your needs.
          </li>
          <li className="text-1xl max-w-4xl pb-4">
            Used MongoDB to save the generated sites data, available to fetch
            later.
          </li>
          <li className="text-1xl max-w-4xl pb-4">
            Used the gpt-3.5-turbo model for the generation with custom prompts.
          </li>
          <li className="text-1xl max-w-4xl pb-4">
            Used regex to filter out html,css,js code and preview in an
            &lt;iframe&gt;.
          </li>
          {/* <li className="text-1xl max-w-3xl pb-4"></li> */}
        </ul>
        <div className="w-full items-center justify-center text-center text-2xl px-6 pb-10 ">
          Under development
        </div>
        <ul className="list-outside list-disc ml-6 px-10">
          <li className="text-1xl max-w-3xl pb-4">
            Deploy to a subdomain directly from the app. (Done ✅)
          </li>
          <li className="text-1xl max-w-3xl pb-4">
            Save your generated websites and showcase them.( Done ✅)
          </li>
          <li className="text-1xl max-w-3xl pb-4">
            Modify the html,css,js files and save submission.( Working on it 🚧)
          </li>
          <li className="text-1xl max-w-3xl pb-4">
            Create a microservice to retreive images as the API response
            provides dead links. (Working on it 🚧)
          </li>
        </ul>
        <Footer />
      </div>
    </div>
  );
}
