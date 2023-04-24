"use client"
import React, { useState } from "react";
import Avatar from "../Avatar";
import { useTheme } from "next-themes";
import ClickOut from "react-simple-clickout";
import Data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import {  useRecoilValue } from "recoil";
import { userState } from "@/atoms/userState";
import supabase from "@/utils/supabase";

export default function EachPostComment({postId}) {
  const { theme } = useTheme();
  const [showEmoji, setShowEmoji] = useState(false);
  const [content, setContent] = useState("");
  const userData = useRecoilValue(userState);
  const [isError,setIsError] = useState("");
  const [isLoading,setIsLoading] = useState(false);
  const [uploads,setUploads] = useState([]);

  const addEmoji = (e) => {
    let sym = e.unified.split("-");
    let codeArray = [];
    sym.forEach((el) => codeArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codeArray);
    setContent(content + emoji);
  };

  const createComment = async() => {
    setIsError("");
    if(content === "") {
      setIsError('Mohon tulis komentar mu');
      return;
    }
    let uploadedImage = null

    if(uploads.length !== 0 ) {
      uploadedImage = uploads[0]
    }

    const res = await supabase.from('comments').insert({
      user_id : userData.id,
      text: content,
      post_id: postId,
      image:  uploadedImage
    })

    setContent("");
    setUploads([]);
  }


  const addPhotos = async(e) => {
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
         const res = await supabase.storage.from('comments').upload(newName,file);
         if(res.data) {
          const url =  process.env.NEXT_PUBLIC_SUPABASE_URL + '/storage/v1/object/public/comments/' + newName
          setUploads(prevUpload => [...prevUpload,url])
         }
    }
    setIsError("");
    setIsLoading(false);
  }
  return (
    <div className="mt-5 border-t border-t-gray-500 -mx-4 relative">
      <span className="text-sm text-red-500 ml-5">{isError}</span>
      <div className="flex gap-2 px-5 mt-3">
        <div>
        <Avatar imageUrl={userData !== null && userData.avatar}/>
        </div>
        <textarea
          className="grow block w-full p-3 h-14 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={`Comment your opinion, ${userData?.name}`}
          value={content}
          onChange={e => setContent(e.target.value)}
        />
      </div>
      <div className="flex gap-5 items-center mt-2 px-5">
        <div>
          <button className="flex gap-1" onClick={() => setShowEmoji(!showEmoji)}>
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
        <div>
          <label className="flex gap-1 cursor-pointer">
          <input type="file" className="hidden" onChange={addPhotos} />
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

            <span className="hidden md:block">Upload Image</span>
          </label>
        </div>
        {showEmoji && (
          <ClickOut onClickOut={() => setShowEmoji(false)}>
            <div className="absolute top-[7.5rem] rounded-lg z-20 left-1 shadow-md shadow-gray-500 dark:shadow-gray-700">
              <Picker data={Data} theme={theme} onEmojiSelect={addEmoji} />
            </div>
          </ClickOut>
        )}
        <div className="grow text-right">
          <button className="bg-socialBlue text-white px-6 py-1 rounded-md" onClick={createComment} disabled={isLoading}>
            Comment
          </button>
        </div>
      </div>
        <div className="flex justify-evenly w-full flex-wrap mt-3">
          {uploads.map(upload => (
            <div className="h-28 w-28" key={upload}>
              <img src={upload} alt="" className="w-full h-full object-cover rounded-md" />
            </div>
          ))}
        </div>
    </div>
  );
}
