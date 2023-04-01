"use client";
import { useState } from "react";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { useSession, signIn, signOut } from "next-auth/react";
import { AiOutlineGithub, AiOutlineGoogle } from "react-icons/ai";

const NAV_ITEMS = [
  {
    label: "About",
    page: "about",
  },
  {
    label: "Community",
    page: "community",
  },
];

export default function Navbar() {
  const [navbar, setNavbar] = useState(false);
  const { data: session, status } = useSession();

  const [authStatus, setAuthStatus] = useState();

  const [accountDrawer, setAccountDrawer] = useState(false);

  const accounHandler = () => {};

  return (
    <header className="w-full mx-auto  px-4 sm:px-20 fixed top-0 z-50  bg-transparent shadow dark:backdrop-blur">
      <div className="justify-between md:items-center md:flex">
        <div>
          <div className="flex items-center justify-between py-3 md:py-3 md:block">
            <div className="md:py-1 md:block">
              <h2 className="text-4xl font-bold  text-inherit ">
                <a href="/build">Ai Builder</a>
              </h2>
            </div>
            <div className="md:hidden">
              <button
                onClick={() => {
                  setNavbar(!navbar);
                }}
              >
                {navbar ? (
                  <IoMdClose className=" fill-black " size={30} />
                ) : (
                  <IoMdMenu className=" fill-black " size={30} />
                )}
              </button>
            </div>
          </div>
        </div>
        <div>
          <div
            className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0  ${
              navbar ? "block" : "hidden"
            }`}
          >
            <div className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
              {NAV_ITEMS.map((item, idx) => {
                return (
                  <a
                    key={idx}
                    href={item.page}
                    className={
                      "block lg:inline-block text-inherit  cursor-pointer"
                    }
                    offset={-100}
                    duration={500}
                    onClick={() => setNavbar(!navbar)}
                  >
                    {item.label}
                  </a>
                );
              })}

              <div className="flex flex-col">
                <button
                  id="dropdownDefaultButton"
                  data-dropdown-toggle="dropdown"
                  onClick={() => setAccountDrawer(!accountDrawer)}
                  className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  type="button"
                >
                  Account{" "}
                  <svg
                    className="w-4 h-4 ml-2"
                    aria-hidden="true"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </button>

                <div
                  id="dropdown"
                  className={` mt-10 absolute z-10  bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700  ${
                    accountDrawer ? "block" : "hidden"
                  }`}
                >
                  <ul
                    className="py-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownDefaultButton"
                  >
                    {status === "authenticated" ? (
                      <div>
                        <li>
                          <a
                            href="/dashboard"
                            className="block px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Dashboard
                          </a>
                        </li>
                        <li>
                          <button
                            onClick={() => signOut()}
                            className="block px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Sign out
                          </button>
                        </li>
                      </div>
                    ) : (
                      <div>
                        <div className="  px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                          <button
                            type="button"
                            onClick={() => signIn("github")}
                          >
                            <div className="flex flex-row w-full px-4 justify-between items-center">
                              <p className="pr-2">Sign In with </p>

                              <AiOutlineGithub
                                className="hover:-translate-y-1 transition-transform cursor-pointer text-neutral-500 dark:text-neutral-400"
                                size={30}
                              />
                            </div>
                          </button>
                        </div>
                        <div className="  px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                          <button
                            type="button"
                            onClick={() => signIn("google")}
                          >
                            <div className="flex flex-row w-full px-4 justify-between items-center">
                              <p className="pr-2">Sign In with </p>

                              <AiOutlineGoogle
                                className="hover:-translate-y-1 transition-transform cursor-pointer text-neutral-500 dark:text-neutral-400"
                                size={30}
                              />
                            </div>
                          </button>
                        </div>
                      </div>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
