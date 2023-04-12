import React from 'react'
import Card from '../Card'
import FriendInfo from '../FriendInfo'
import PostCard from '../PostCard'

export default function ProfileContentTabs(props) {
    const isPosts= props.isPosts
    const isAbout= props.isAbout
    const isFollowers= props.isFollowers
    const isPhotos= props.isPhotos

    
  return (
    <>
        {isPosts && (
            <div>
                {props.posts.map(post => {
                    return(

                        <PostCard key={post.id} post={post}/>
                    )
                })}
            </div>
        )}
      {isAbout && (
        <div>
          <Card>
            <h2 className="text-3xl mb-2">About meee</h2>
            <p className="mb-2 text-sm text-justify">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
              reprehenderit corporis quidem soluta ex blanditiis?
            </p>
            <p className="mb-2 text-sm text-justify">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatem reiciendis, voluptatibus nulla obcaecati beatae esse
              aspernatur cum. Quam quis distinctio alias ipsam.
            </p>
          </Card>
        </div>
      )}
      {isFollowers && (
        <div>
          <Card>
            <h2 className="text-3xl mb-2">Followers</h2>
            <div className="">
              <div className="border-b border-b-gray-100 p-4 -mx-4">
                <FriendInfo />
              </div>
              <div className="border-b border-b-gray-100 p-4 -mx-4">
                <FriendInfo />
              </div>
              <div className="border-b border-b-gray-100 p-4 -mx-4">
                <FriendInfo />
              </div>
              <div className="border-b border-b-gray-100 p-4 -mx-4">
                <FriendInfo />
              </div>
              <div className="border-b border-b-gray-100 p-4 -mx-4">
                <FriendInfo />
              </div>
              <div className="border-b border-b-gray-100 p-4 -mx-4">
                <FriendInfo />
              </div>
              <div className="border-b border-b-gray-100 p-4 -mx-4">
                <FriendInfo />
              </div>
              <div className="border-b border-b-gray-100 p-4 -mx-4">
                <FriendInfo />
              </div>
              <div className="border-b border-b-gray-100 p-4 -mx-4">
                <FriendInfo />
              </div>
            </div>
          </Card>
        </div>
      )}
      {isPhotos && (
        <div>
          <Card>
            <h2 className="text-3xl mb-2">Photos</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="overflow-hidden rounded-md h-48 flex items-center shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1598395927056-8d895e701c3b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
                  alt=""
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="overflow-hidden rounded-md h-48 flex items-center shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1598395927056-8d895e701c3b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
                  alt=""
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="overflow-hidden rounded-md h-48 flex items-center shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1598395927056-8d895e701c3b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
                  alt=""
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="overflow-hidden rounded-md h-48 flex items-center shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1598395927056-8d895e701c3b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
                  alt=""
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
          </Card>
        </div>
      )}
    </>
  )
}
