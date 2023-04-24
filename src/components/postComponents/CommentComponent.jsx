import React from "react";
import Avatar from "../Avatar";
import ReactTimeAgo from "react-time-ago";

export default function CommentComponent({ comment }) {
  return (
    <div className="flex flex-col relative">
      <span className="w-0.5 h-full z[-10] absolute bg-gray-300 left-5" />
      <div className="flex items-center flex-col mt-4">
        <div className="flex items-center gap-2 w-full">
          <div className="-mt-7 z-10">
            <Avatar />
          </div>
          <div className="flex flex-col justify-center">
            <div className="text-sm text-gray-500 text-left flex-1">
              <span>{comment.profiles.name} </span>
              <span>
                {" "}
                <ReactTimeAgo date={new Date(comment.created_at).getTime()} />
              </span>
            </div>
            <span className="">{comment.text}.</span>
          </div>
        </div>

        <div className="my-1 z-10">
          <div className="rounded-md overflow-hidden mx-4">
            <img
              src={comment.image}
              alt=""
            />
          </div>
        </div>

      </div>
    </div>
  );
}
