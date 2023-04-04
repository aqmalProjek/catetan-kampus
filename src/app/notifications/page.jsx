import Avatar from "@/components/Avatar";
import Card from "@/components/Card";
import Layout from "@/components/Layout";
import Link from "next/link";
import React from "react";

export default function NotificationsPage() {
  return (
    <Layout>
      <h1 className="text-6xl mb-4 text-gray-400">Notifications</h1>
      <Card noPadding={true}>
        <div className="">
          <div className="flex gap-2 items-center border-b border-b-gray-100 p-4">
            <Avatar />
            <div>
              <Link
                href={"/profile"}
                className="font-semibold mr-1 hover:underline"
              >
                Jhon Doe
              </Link>
              liked
              <Link href="/" className="text-socialBlue hover:underline">
                your photos
              </Link>
            </div>
          </div>
          <div className="flex gap-2 items-center border-b border-b-gray-100 p-4">
            <Avatar />
            <div>
              <Link
                href={"/profile"}
                className="font-semibold mr-1 hover:underline"
              >
                Jhon Doe
              </Link>
              liked
              <Link href="/" className="text-socialBlue hover:underline ml-1">
                your photos
              </Link>
            </div>
          </div>
          <div className="flex gap-2 items-center border-b border-b-gray-100 p-4">
            <Avatar />
            <div>
              <Link
                href={"/profile"}
                className="font-semibold mr-1 hover:underline"
              >
                Jhon Doe
              </Link>
              liked
              <Link href="/" className="text-socialBlue hover:underline ml-1">
                your photos
              </Link>
            </div>
          </div>
          <div className="flex gap-2 items-center border-b border-b-gray-100 p-4">
            <Avatar />
            <div>
              <Link
                href={"/profile"}
                className="font-semibold mr-1 hover:underline"
              >
                Jhon Doe
              </Link>
              liked
              <Link href="/" className="text-socialBlue hover:underline ml-1">
                your photos
              </Link>
            </div>
          </div>
        </div>
      </Card>
    </Layout>
  );
}
