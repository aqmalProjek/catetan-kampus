import PostById from "@/components/PostById";
import supabase from "@/utils/supabase";
import React from "react";

export const revalidate = 10;


export async function generateStaticParams(){
  const {data : eachPostByID} = await supabase.from('posts').select("id");
  return eachPostByID ?? []
}

async function getData(id) {
  const { data: post } = await supabase
  .from("posts")
  .select('id, content,title, created_at, profiles(id,avatar,name,address,university,position), photos')
  .eq('id',id)
  .single();
  return post;
}


export async function generateMetadata({ params }) {
  const post = await getData(params.id)
  return {
    title: `Catetan Kampus - ${post.title}`,
  };
}
export default async function EachPost({ params }) {

  const post = await getData(params.id)

  return (
    <PostById post={post}/>
  );
}
