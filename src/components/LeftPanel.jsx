import React from 'react'
import './LeftPanel.css'
import { BiSolidMessageRounded } from "react-icons/bi";
import { FaUserFriends } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import FriendsList from './FriendsList';
import Search from './Search/Search.jsx';



export default function LeftPanel({ active, setWindow }) {
    return (
        <div className="left-panel">
            <Search></Search>
            <form action="http://localhost:8080/login" method='post'>
                <button> login</button>
            </form>

            <div className="nav">
                <div onClick={() => { setWindow('chats') }} className="nav-item" data-active={active == 'chats'}>
                    <BiSolidMessageRounded className='icon' />
                    <p>Chats</p>
                </div>

                <div onClick={() => { setWindow('people') }} className="nav-item" data-active={active == 'people'}>

                    <FaUserFriends className='icon' />
                    <p>People</p>
                </div>

                <div onClick={() => { setWindow('profile') }} className="nav-item" data-active={active == 'profile'}>
                    <FaUserAlt className='icon' />
                    <p>Profile</p>
                </div>
            </div>

            <FriendsList></FriendsList>

        </div>
    )
}
