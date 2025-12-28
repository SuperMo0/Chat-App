import React from 'react'
import './FriendsList.css'
import FriendInfo from './FriendInfo'
import { useData } from '../Layout/Layout';


export default function FriendsList() {

    const { setChat, friends } = useData();


    return (
        <div className="friends-list">
            {friends.map((f) => {
                return <FriendInfo onClick={() => { setChat(f.id) }} status={'online'} key={f.id} name={f.name} image={f.image}></FriendInfo>
            })}
        </div>
    )
}
