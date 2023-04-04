import Layout from '@/components/Layout'
import PostCard from '@/components/PostCard'
import React from 'react'

export default function SavedPage() {
  return (
    <Layout>
        <h1 className='text-6xl mb-4 text-gray-400'>Your Saved Post</h1>
        <PostCard />
        <PostCard />
        <PostCard />
    </Layout>
  )
}
