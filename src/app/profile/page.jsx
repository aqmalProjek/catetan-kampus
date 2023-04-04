"use client";
import Avatar from "@/components/Avatar";
import Card from "@/components/Card";
import Layout from "@/components/Layout";
import PostCard from "@/components/PostCard";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import ProfilePage from "./[profile]/page";

export default function Profile() {
  const router = useRouter();
  const pathName = usePathname();
  const isPosts = pathName.includes("/posts") || pathName === "/profile";
  const isAbout = pathName.includes("/about");
  const isFollowers = pathName.includes("/followers");
  const isPhotos = pathName.includes("/photos");


  const tabClasses = 'flex gap-1 items-center text-xs md:text-md';
  const tabActiveClasses = 'flex gap-1 items-center border-b-4 border-socialBlue text-socialBlue text-xs md:text-md';
  return (
    <ProfilePage />
  );
}
