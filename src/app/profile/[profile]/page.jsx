"use client";
import Avatar from "@/components/Avatar";
import Card from "@/components/Card";
import FriendInfo from "@/components/FriendInfo";
import Layout from "@/components/Layout";
import PostCard from "@/components/PostCard";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export default function ProfilePage() {
  const router = useRouter();
  const pathName = usePathname();
  const isPosts = pathName.includes("/posts") || pathName === "/profile";
  const isAbout = pathName.includes("/about");
  const isFollowers = pathName.includes("/followers");
  const isPhotos = pathName.includes("/photos");


  const tabClasses = 'flex gap-1 items-center text-xs md:text-md';
  const tabActiveClasses = 'flex gap-1 items-center border-b-4 border-socialBlue text-socialBlue text-xs md:text-md';
  return (
    <Layout>
      <Card noPadding={true}>
        <div className="relative overflow-hidden rounded-md">
          <div className="h-56 overflow-hidden flex justify-center items-center ">
            <img
              src="https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              alt=""
            />
          </div>
          <div className="absolute top-44 left-4">
            <Avatar size={"lg"} />
          </div>
          <div className="ml-32 pb-0">
            <h1 className="text-2xl font-bold">Jhon doe</h1>
            <div className="text-gray-500 leading-4">Rancaekek, Indonesia</div>
          </div>
          <div className="ml-3 md:ml-5 mt-5 mb-0 flex gap-5">
            <Link
              href={"/profile/posts"}
              className={isPosts ? tabActiveClasses : tabClasses}
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
                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                />
              </svg>
              <span className="hidden sm:block">

              Post
              </span>
            </Link>
            <Link
              href={"/profile/about"}
              className={isAbout ? tabActiveClasses : tabClasses}
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
                  d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                />
              </svg>
              <span className="hidden sm:block">

              About
              </span>
            </Link>
            <Link
              href={"/profile/followers"}
              className={isFollowers ? tabActiveClasses : tabClasses}
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
              <span className="hidden sm:block">

              Followers
              </span>
            </Link>
            <Link
              href={"/profile/photos"}
              className={isPhotos ? tabActiveClasses : tabClasses}
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
                  d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
              <span className="hidden sm:block">

              Photos
              </span>
            </Link>
          </div>
        </div>
      </Card>

      {isPosts && (
        <div>
          <PostCard />
        </div>
      )}
      {isAbout && (
        <div>
          <Card>
            <h2 className="text-3xl mb-2">About me</h2>
            <p className="mb-2 text-sm text-justify">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
              reprehenderit corporis quidem soluta ex blanditiis?
            </p>
            <p className="mb-2 text-sm text-justify">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatem reiciendis, voluptatibus nulla obcaecati beatae esse
              aspernatur cum. Quam quis distinctio alias ipsam.
            </p>
          </Card>
        </div>
      )}
      {isFollowers && (
        <div>
          <Card>
            <h2 className="text-3xl mb-2">Followers</h2>
            <div className="">
              <div className="border-b border-b-gray-100 p-4 -mx-4">
                <FriendInfo />
              </div>
              <div className="border-b border-b-gray-100 p-4 -mx-4">
                <FriendInfo />
              </div>
              <div className="border-b border-b-gray-100 p-4 -mx-4">
                <FriendInfo />
              </div>
              <div className="border-b border-b-gray-100 p-4 -mx-4">
                <FriendInfo />
              </div>
              <div className="border-b border-b-gray-100 p-4 -mx-4">
                <FriendInfo />
              </div>
              <div className="border-b border-b-gray-100 p-4 -mx-4">
                <FriendInfo />
              </div>
              <div className="border-b border-b-gray-100 p-4 -mx-4">
                <FriendInfo />
              </div>
              <div className="border-b border-b-gray-100 p-4 -mx-4">
                <FriendInfo />
              </div>
              <div className="border-b border-b-gray-100 p-4 -mx-4">
                <FriendInfo />
              </div>
            </div>
          </Card>
        </div>
      )}
      {isPhotos && (
        <div>
          <Card>
            <h2 className="text-3xl mb-2">Photos</h2>
            <div className="grid grid-cols-2 gap-4">
            <div className="overflow-hidden rounded-md h-48 flex items-center shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1598395927056-8d895e701c3b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
                  alt=""
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="overflow-hidden rounded-md h-48 flex items-center shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1598395927056-8d895e701c3b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
                  alt=""
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="overflow-hidden rounded-md h-48 flex items-center shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1598395927056-8d895e701c3b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
                  alt=""
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="overflow-hidden rounded-md h-48 flex items-center shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1598395927056-8d895e701c3b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
                  alt=""
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
          </Card>
        </div>
      )}
    </Layout>
  );
}
