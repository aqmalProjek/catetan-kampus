import Layout from '@/components/Layout'
import PostFormCard from '@/components/PostFormCard'
import React from 'react'

export const metadata = {
  title: 'Catetan Kampus - Add Post',
  description: 'Tempat untuk menambah postingan di catetan kampus',
}

export default function AddPost() {
  return (
    <Layout>
        <PostFormCard />
    </Layout>
  )
}
