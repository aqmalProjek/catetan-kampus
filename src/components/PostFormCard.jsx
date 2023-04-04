"use client";
import React, { useState } from "react";
import Avatar from "./Avatar";
import Card from "./Card";
import Data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useTheme } from "next-themes";
import ClickOut from "react-simple-clickout";
import ReactMarkdown from "react-markdown";

export default function PostFormCard() {
  const { theme } = useTheme();
  const [showEmoji, setShowEmoji] = useState(false);
  const [content, setContent] = useState("");

  const addEmoji = (e) => {
    let sym = e.unified.split("-");
    let codeArray = [];
    sym.forEach((el) => codeArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codeArray);
    setContent(content + emoji);
  };
  return (
    <>
      <Card>
        <div className="flex gap-2">
          <div>
            <Avatar />
          </div>
          <textarea
            className="grow block w-full p-3 h-14 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={`Whats on your mind?`}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className="flex gap-5 items-center mt-2 relative">
          <div>
            <button className="flex gap-1">
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
                  d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                />
              </svg>
              <span className="hidden md:block">People</span>
            </button>
          </div>
          <div>
            <button className="flex gap-1">
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
                  d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"
                />
              </svg>
              <span className="hidden md:block">Check in</span>
            </button>
          </div>
          <div>
            <button
              className="flex gap-1"
              onClick={() => setShowEmoji(!showEmoji)}
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
                  d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
                />
              </svg>
              <span className="hidden md:block">Mood</span>
            </button>
          </div>
          {showEmoji && (
            <ClickOut onClickOut={() => setShowEmoji(false)}>
              <div className="absolute top-12 rounded-lg z-20 -left-5 shadow-md shadow-gray-500 dark:shadow-gray-700">
                <Picker data={Data} theme={theme} onEmojiSelect={addEmoji} />
              </div>
            </ClickOut>
          )}
          <div className="grow text-right">
            <button className="bg-socialBlue text-white px-6 py-1 rounded-md">
              Share
            </button>
          </div>
        </div>
      </Card>
      <Card>
        <h3 className="text-xl italic text-gray-500">
          Preview Tampilan post (markdown systax){" "}
          <a
            href="https://www.markdownguide.org/cheat-sheet/"
            rel="noopener noreferrer"
            target="_blank"
            className="text-blue-500 hover:text-blue-600 hover:underline"
          >
            Klik untuk pelajari
          </a>
        </h3>
        <ReactMarkdown>{content}</ReactMarkdown>
      </Card>
    </>
  );
}
