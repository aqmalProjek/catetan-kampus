'use client'
import { userState } from "@/atoms/userState";
import supabase from "@/utils/supabase";
import { uploadUserProfileImage } from "@/utils/user";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";

export default function Avatar({ size, imageUrl = null, editable, onChange }) {
  let imageUse =
    "https://th.bing.com/th/id/OIP.YCGQ25lthu82-vALQSw9gwHaHa?w=184&h=184&c=7&r=0&o=5&pid=1.7";

  let width = "w-12 h-12";
  if (size === "lg") {
    width = "w-24 h-24";
  }

  const [isError,setIsError] = useState("");
    const [isLoading,setIsLoading] = useState(false);
    const userData = useRecoilValue(userState);

  const editAvatar = async(e) => {
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
            await uploadUserProfileImage(supabase,userData.id,file,'avatars','avatar')
            if(onChange) onChange();
        }
        setIsLoading(false)
  }
  return (
    <div className={`${width} overflow-hidden rounded-full`}>
      <div className={`rounded-full  ${isLoading && 'animate-pulse'}`}>
        <img
          src={!imageUrl ? imageUse : imageUrl}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      {editable && (
        <label className={`absolute bottom-0 right-0 shadow-md  dark:shadow-gray-800 cursor-pointer p-2 bg-white dark:bg-slate-800 rounded-full ${isLoading && 'hidden'}`}>
          <input type="file" className="hidden" onChange={editAvatar}/>
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
        </label>
      )}
    </div>
  );
}
