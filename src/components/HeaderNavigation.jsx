"use client";
import React, { useEffect, useState } from "react";
import Avatar from "./Avatar";
import { useTheme } from "next-themes";
import ClickOut from "react-simple-clickout";
import Link from "next/link";

export default function HeaderNavigation() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState();
  const [active, setActive] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <div className="flex  shadow-md w-full h-16 fixed top-0 z-50 bg-white dark:bg-slate-900 items-center px-5 justify-between">
      <div className="mr-5 dark:text-blue-400 ">LOGO</div>
      <div className="max-w-sm w-full flex items-center justify-end gap-2 grow">
        <form className="grow">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Mockups, Logos..."
              required=""
            />
            <button
              type="submit"
              className="hidden md:block text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>
        <div className="w-8 h-8 text-black dark:text-white flex items-center cursor-pointer">
          {currentTheme === "dark" ? (
            <span onClick={() => setTheme("light")}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                />
              </svg>
            </span>
          ) : (
            <span onClick={() => setTheme("dark")}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                />
              </svg>
            </span>
          )}
        </div>
        <div
          className="w-12 h-12 cursor-pointer"
          onClick={() => setActive(true)}
        >
          <Avatar />
          {active && (
            <ClickOut onClickOut={() => setActive(false)}>
              <div className="absolute text-right  py-2 px-3 bg-white dark:bg-slate-900 shadow-md shadow-gray-300 dark:shadow-gray-900 right-0 rounded-sm border border-gray-100 dark:border-gray-800 w-52">
                <span
                  href=""
                  className="text-sm md:text-md flex gap-1 md:gap-4 py-3 my-2  -mx-4 px-6 md:px-4 hover:my-2 rounded-md transition-all"
                >
                  Jhon Doe
                </span>
                <hr className="mx-2" />
                <Link
                  href="/profile/"
                  className="text-sm md:text-md flex gap-1 md:gap-4 py-3 my-2 hover:bg-blue-500 hover:bg-opacity-20 -mx-4 px-6 md:px-4 hover:my-2 rounded-md transition-all hover:scale-110 hover:shadow-md hover:shadow-gray-300 hover:dark:shadow-gray-900"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Profile
                </Link>
                <Link
                  href="/profile/followers"
                  className="text-sm md:text-md flex gap-1 md:gap-4 py-3 my-2 hover:bg-blue-500 hover:bg-opacity-20 -mx-4 px-6 md:px-4 hover:my-2 rounded-md transition-all hover:scale-110 hover:shadow-md hover:shadow-gray-300 hover:dark:shadow-gray-900"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                  </svg>
                  Followers
                </Link>
                <Link
                  href="/login"
                  className="text-sm md:text-md flex gap-1 md:gap-4 py-3 my-2 hover:bg-blue-500 hover:bg-opacity-20 -mx-4 px-6 md:px-4 hover:my-2 rounded-md transition-all hover:scale-110 hover:shadow-md hover:shadow-gray-300 hover:dark:shadow-gray-900"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                    />
                  </svg>
                  Logout
                </Link>
              </div>
            </ClickOut>
          )}
        </div>
      </div>
    </div>
  );
}
