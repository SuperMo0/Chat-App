import React from 'react'
import './FriendInfo.css'

export default function FriendInfo({ onClick, status, image, name }) {

    return (
        <div onClick={onClick} className="friend-info">
            <div className="img-stauts-container">
                <div className="img-container">
                    <img src={image} alt="" />
                </div>
                <div className="status-dot"></div>
            </div>
            <div className="friend-name-status-container">
                <p>{name}</p>
                {status && <p className='online'>Online</p>}
            </div>
        </div>
    )
}
