import React from 'react'
import Avatar from './Avatar'

export default function CommentComponent() {
  return (
    <div className="flex flex-col relative">
        <span className='w-0.5 h-full z[-10] absolute bg-gray-300 left-5' />
            <div className="flex items-center flex-col mt-4">
                <div className="flex items-center gap-2">
                <div className="-mt-7 z-10">
                <Avatar />
                </div>
                <div className="flex flex-col justify-center">
                    <div className="text-sm text-gray-500">
                        <span>Jhon doe</span>
                        <span> 2 hours Ago</span>
                    </div>
                    <span className="">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum sapiente laudantium dicta obcaecati maxime. Quia.</span>
                </div>
                </div>
                <div className="my-1 z-10">

                    <div className="rounded-md overflow-hidden mx-4">
                    <img
                        src="https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                        alt=""
                    />
                    </div>

                </div>
            </div>

        </div>
  )
}
