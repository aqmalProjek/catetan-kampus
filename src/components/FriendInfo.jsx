import React from 'react'
import Avatar from './Avatar'

export default function FriendInfo() {
  return (
    <div className="flex gap-2">
                <Avatar />
                <div>
                    <h3 className="font-bold text-xl">Jhon doe</h3>
                    <div className="text-sm leading-4">5 mutual followers</div>
                </div>
    </div>
  )
}
