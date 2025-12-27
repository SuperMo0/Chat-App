import React from 'react'
import './LeftPanel.css'
import { BiSolidMessageRounded } from "react-icons/bi";
import { FaUserFriends } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import FriendsList from './FriendsList';
import Search from './Search/Search.jsx';





export default function LeftPanel() {
    return (
        <div className="left-panel">
            <Search></Search>

            <div className="nav">
                <div className="nav-item">
                    <BiSolidMessageRounded className='icon' />
                    <p>Chats</p>
                </div>

                <div className="nav-item">
                    <FaUserFriends className='icon' />
                    <p>People</p>
                </div>

                <div className="nav-item">
                    <FaUserAlt className='icon' />
                    <p>Profile</p>
                </div>
            </div>

            <FriendsList></FriendsList>

        </div>
    )
}
