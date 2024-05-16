"use client";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";

const Navbar = () => {
  const { data: session } = useSession();

  const [showdropdown, setDropdown] = useState(false);

  return (
    <nav className="sticky container m-auto bg-white flex justify-between  px-4 max-sm:w-[100vw] h-20 items-center shadow-lg">
      <div className="logo font-bold max-sm:text-sm">
        <Link href={"/"}>
          <span className=" text-xl">Insta</span>
        </Link>
        <span className=" text-green-700 text-xl">See</span>
      </div>

      {session ? (
        <div className=" flex justify-end items-center gap-4 max-sm:scale-75">
          <div className=" relative">
            <button
              className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
              onClick={() => setDropdown(!showdropdown)}
              id="dropdownDefaultButton"
              data-dropdown-toggle="dropdown"
              type="button"
            >
              <span className=" relative flex items-center px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                <div className=" flex">
                  {" "}
                  <span className=" max-sm:hidden">
                    Hello {session?.user?.name.split("_").join(" ")} !
                  </span>
                  <span className=" hidden max-sm:block ">Menu</span>{" "}
                </div>
                <svg
                  className="w-2.5 h-2.5 ms-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </span>
            </button>

            <div
              id="dropdown"
              className={` mt-2 absolute z-10 ${
                showdropdown ? "" : "hidden"
              } bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
            >
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownDefaultButton"
              >
                <li>
                  <Link
                    onClick={() => setDropdown(!showdropdown)}
                    href={`/${session?.user?.name}`}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    My Page
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/addpost"}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Add Post
                  </Link>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Earnings
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <button
            onClick={signOut}
            className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Logout
            </span>
          </button>
        </div>
      ) : (
        <button
          onClick={() => signIn("google")}
          className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
        >
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Login
          </span>
        </button>
      )}
    </nav>
  );
};

export default Navbar;
