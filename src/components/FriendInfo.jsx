import React from 'react'
import './FriendInfo.css'

export default function FriendInfo({ handleOpenChat, friend }) {
    return (
        <div onClick={() => { handleOpenChat({ chatId: friend.chatId, friend }) }} className="friend-info">
            <div className="img-stauts-container">
                <div className="img-container">
                    <img src={friend.image} alt="" />
                </div>
                <div className={"status-dot " + (friend.isOnline ? "green" : "grey")} ></div>


            </div>
            <div className="friend-name-status-container">
                <p>{friend.name}</p>
                {friend.isOnline ? <p className='online'>Online</p> : <p className='offline'>Offline</p>}
            </div>
            {friend.notification != 0 && <div className='notification center'>{friend.notification}</div>}
        </div>
    )
}
