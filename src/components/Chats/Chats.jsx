import React from 'react'
import './Chats.css'
import FriendInfo from './../FriendInfo'

export default function Chats() {

    let friends = []
    for (let i = 0; i < 2; i++) {
        friends.push(<FriendInfo message={true}></FriendInfo>
        )
    }
    return (
        <div className="chats-list">

            {friends}

        </div>
    )


}
