"use client"
import React, { useEffect, useState } from 'react'
import CommentComponent from './CommentComponent'
import EachPostComment from './EachPostComment'
import supabase from '@/utils/supabase';

export default function ParentCommentComponents({postId}) {

    const [comments,setComments] = useState(null);

    useEffect(() => {
        supabase
    .channel('postgresChangesChannel')
    .on('postgres_changes', {
      event: 'INSERT',
      schema: 'public',
      table: 'comments'
    }, payload => fetchCommments())
    .subscribe()

    fetchCommments()
    },[])

    const fetchCommments = () => {
        supabase.from('comments')
        .select("id,created_at,text,image, profiles(id,avatar,name)")
        .order("created_at", { ascending: false })
        .eq('post_id',postId)
        .then(result => {
            setComments(result.data);
        })
    } 



  return (
    <>
        <EachPostComment postId={postId}/>
        <hr className="mt-3 -mx-4" />
        {comments === null ? (null) : (
            comments.map((comment,index) => {
                return(
                    <CommentComponent comment={comment} key={index}/>
                )
            })
        )}
    </>
  )
}
