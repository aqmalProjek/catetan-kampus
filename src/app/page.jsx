import Layout from "@/components/Layout";
import PostCard from "@/components/PostCard";
import supabase from "@/utils/supabase";
export const revalidate = 10;

async function getData() {
  const { data: posts } = await supabase
    .from("posts")
    .select('id, content,title, created_at, profiles(id,avatar,name), photos')
    .order("created_at", { ascending: false });
  return posts;
}

export default async function homePage() {
  const posts = await getData();


  return (
    <Layout>
      <>
        {posts.map((post) => {
          return <PostCard key={post.id} post={post} />;
        })}
      </>
    </Layout>
  );
}
