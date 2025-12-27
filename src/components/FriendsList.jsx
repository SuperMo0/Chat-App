import React from 'react'
import './FriendsList.css'
import FriendInfo from './FriendInfo'


export default function FriendsList() {

    let friends = []
    for (let i = 0; i < 30; i++) {
        friends.push(<FriendInfo></FriendInfo>
        )
    }
    return (
        <div className="friends-list">

            {friends}

        </div>
    )
}
