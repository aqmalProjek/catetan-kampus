"use client";
import React from "react";
import Layout from "./Layout";
import Card from "./Card";
import Link from "next/link";
import ReactTimeAgo from "react-time-ago";
import Avatar from "./Avatar";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import ParentCommentComponents from "./postComponents/ParentCommentComponents";

export default function PostById({ post }) {
  return (
    <Layout>
      <Card>
        <Link
          href={"/"}
          className="bg-socialBlue text-white px-6 py-1 rounded-md"
        >
          Back
        </Link>
        <hr className="my-3 -mx-4" />
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 border-b border-b-gray-300 pb-3 -mx-4">
            <div className="ml-5">
              <Avatar size={"lg"} imageUrl={post.profiles.avatar}/>
            </div>
            <div className="flex flex-col">
              <div className="flex justify-between">
                <div>
                  <span>{post.profiles.name} </span>
                  <span>
                    <ReactTimeAgo date={new Date(post.created_at).getTime()} />
                  </span>
                </div>
              </div>
              <div className="flex items-center flex-col md:flex-row">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 inline mr-1 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                  </svg>

                  <span className="text-gray-500">{post.profiles.address}</span>
                </div>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 inline mx-1 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
                    />
                  </svg>
                  <span className="text-gray-500">
                    {post.profiles.university}
                  </span>
                </div>
              </div>
              <div className="flex mt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 inline mx-1 text-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"
                  />
                </svg>
                <span className="text-gray-500">
                  As <i className="text-white">{post.profiles.position}</i>{" "}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h1 className="text-xl md:text-2xl">{post.title}</h1>
          </div>

          <div className="border-b border-b-gray-500 pb-3 -mx-4">
            {post.photos.length > 1 ? (

            <div className="grid grid-cols-2 gap-4">
              {post.photos.map((photo, index) => {
                return (
                  <div className="overflow-hidden rounded-md h-48 flex items-center shadow-md" key={index}>
                    <img
                      src={photo}
                      alt={`photo ke ${index + 1}`}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                );
              })}
            </div>
            ) : (
                <div className="rounded-md overflow-hidden mx-1">
                    <img
                    src={post.photos[0]}
                    alt={`photo ke 1`}
                  /> 
                </div>
            )}

          </div>

          <div>
            <ReactMarkdown className="text-sm mt-2">
              {post.content}
            </ReactMarkdown>
          </div>
        </div>
        {/* for komentar */}
        <ParentCommentComponents postId={post.id} />
      </Card>
    </Layout>
  );
}
