import Layout from "@/components/Layout";
import ProfileEdit from "@/components/profilesComponents/ProfileEdit";
import supabase from "@/utils/supabase";
import { notFound } from "next/navigation";

export const revalidate = 10;


export async function generateStaticParams(){
  const {data : profileUsers} = await supabase.from('profiles').select("id");
  return profileUsers ?? []
}

export async function generateMetadata({ params }) {
  const {data: profileUser} = await supabase.from('profiles').select().match({'id' : params.profile[1]}).single();
  return {
    title: `Catetan Kampus - ${profileUser.name}`,
  };
}

export default async function ProfilePage({ params }) {
  
  const {data: profileUser} = await supabase.from('profiles').select().match({'id' : params.profile[1]}).single();

  const {data: posts} = await supabase.from('posts').select('id, content,title, created_at, profiles(id,avatar,name), photos').match({'author' : params.profile[1]})

  console.log(profileUser);
  
  if(profileUser?.code == '22P02') {
    return notFound();
  }


  return (
    <Layout>
    <ProfileEdit params={params} profileUser={profileUser} posts={posts} />
    </Layout>
  );
}
