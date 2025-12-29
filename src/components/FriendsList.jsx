import React from 'react'
import './FriendsList.css'
import FriendInfo from './FriendInfo'
import { useData } from '../Layout/Layout';


export default function FriendsList() {

    const { openChat, friends } = useData();


    return (
        <div className="friends-list">
            {friends.map((f) => {
                return <FriendInfo onClick={() => { openChat(f.id) }} key={f.id} friend={f}></FriendInfo>
            })}
        </div>
    )
}
