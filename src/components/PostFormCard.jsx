"use client";
import React, { useState } from "react";
import Avatar from "./Avatar";
import Card from "./Card";
import Data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useTheme } from "next-themes";
import ClickOut from "react-simple-clickout";
import ReactMarkdown from "react-markdown";
import { useRecoilValue } from "recoil";
import { userState } from "@/atoms/userState";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";

export default function PostFormCard() {
  const [supabase] = useState(() =>
    createBrowserSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )
  );

  const { theme } = useTheme();
  const userData = useRecoilValue(userState);
  const [showEmoji, setShowEmoji] = useState(false);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [uploads,setUploads] = useState([]);
  
  //crud helper opration
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState("");

  const addEmoji = (e) => {
    let sym = e.unified.split("-");
    let codeArray = [];
    sym.forEach((el) => codeArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codeArray);
    setContent(content + emoji);
  };

  const handleAdd = async () => {
    setIsLoading(true);
    setMessage("");

    try {
      const res = await supabase.from("posts").insert({
        title,
        content,
        author: userData?.id,
        photos: uploads
      });
      setTitle("");
      setContent("");
      setMessage("Artikel created success fully..!");
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const addPhotos = async(e) => {
    //get files information
    setIsLoading(true);
    const files = e.target.files;
    setIsError("");
    setIsError('Uploading your images, please wait..!!!');
    for (const file of files) {
      if(file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/jpg') {
        setIsError('Your files is not an image. please try again');
        e.target.value = null
        return;
      } 
        const newName = Date.now() + file.name;
         const res = await supabase.storage.from('photos').upload(newName,file);
         if(res.data) {
          const url =  process.env.NEXT_PUBLIC_SUPABASE_URL + '/storage/v1/object/public/photos/' + newName
          setUploads(prevUpload => [...prevUpload,url])
         }

    }
    setIsError("");
    setIsLoading(false);
  }

  console.log(uploads);
  return (
    <>
      <Card>
        <span className="text-socialBlue text-sm">{message}</span>
        <span className="text-red-400 text-sm block">{isError}</span>
        <div className="flex gap-2">
          <div>
            <Avatar imageUrl={userData !== null && userData.avatar}/>
          </div>
          <div className="flex gap-2 grow flex-col">
            <input
              type="text"
              className={`grow block w-full p-3 h-14 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${isLoading && 'animate-pulse'}`}
              placeholder={`Judul Artikel`}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isLoading}
            />
            <textarea
              className={`grow block w-full p-3 h-14 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${isLoading && 'animate-pulse'}`}
              placeholder={`Whats on your mind, ${userData?.name}?`}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={isLoading}
            />
          </div>
        </div>
        {uploads.length > 0 && (

        <div className="flex justify-evenly w-full flex-wrap mt-3">
          {uploads.map(upload => (
            <div className="h-28 w-28" key={upload}>
              <img src={upload} alt="" className="w-full h-full object-cover rounded-md" />
            </div>
          ))}
        </div>
        )}
        <div className="flex gap-5 items-center mt-2 relative">
          <div>
            <label className="flex gap-1 cursor-pointer">
              <input type="file" className="hidden" onChange={addPhotos} multiple />
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
                  d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>

              <span className="hidden md:block">Photos</span>
            </label>
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
            <button
              onClick={handleAdd}
              className={`bg-socialBlue text-white px-6 py-1 rounded-md ${isLoading && 'animate-pulse'}`}
              disabled={isLoading}
            >
              Posting
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
