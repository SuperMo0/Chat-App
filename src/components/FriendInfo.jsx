import React from 'react'
import './FriendInfo.css'

export default function FriendInfo({ onClick, friend, children }) {

    if (!friend) {
        console.log(onClick);
        console.log(children);
        return <h1>ok</h1>
    }

    return (
        <div onClick={onClick} className="friend-info">
            <div className="img-stauts-container">
                <div className="img-container">
                    <img src={friend.image} alt="" />
                </div>
                <div className="status-dot"></div>
            </div>
            <div className="friend-name-status-container">
                <p>{friend.name}</p>
                {friend.isOnline && <p className='online'>Online</p>}
            </div>
            {friend.notification != 0 && <div className='notification center'>{friend.notification}</div>}
            {children}
        </div>
    )
}
