"use client";
import React, { useState } from "react";
import supabase from "@/utils/supabase";
import { useRecoilValue } from "recoil";
import { userState } from "@/atoms/userState";
import { uploadUserProfileImage } from "@/utils/user";

export default function Cover({ url, editable = false, onChange }) {
  
    const [isError,setIsError] = useState("");
    const [isLoading,setIsLoading] = useState(false);
    const userData = useRecoilValue(userState);

    const updateCover = async(e) => {
        const file = e.target.files?.[0];
        setIsError("");
        setIsLoading(true);
        if(file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/jpg') {
            setIsError('Your files is not an image. please try again');
            e.target.value = null
            setIsLoading(false);
            return;
        }
        if(file) {
            await uploadUserProfileImage(supabase,userData.id,file,'covers','cover')
            if(onChange) onChange();
        }
        setIsLoading(false)
          
    }
  return (
    <div className={`h-56 overflow-hidden flex justify-center items-center relative ${isLoading && 'animate-pulse'}`}>
      <div>
        <img src={url} alt="" />
      </div>
      {editable && (
        <div className="absolute right-0 bottom-0 m-2">
          <label className={` bg-white dark:bg-slate-800 rounded px-2 shadow-md shadow-slate-600 flex gap-2 items-center cursor-pointer ${isLoading && 'hidden'}`}>
            <input type="file" onChange={updateCover} className="hidden"/>
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
                d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
              />
            </svg>
            Change Cover Image
          </label>
        </div>
      )}
    </div>
  );
}