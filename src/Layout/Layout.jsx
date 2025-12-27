import React, { useState } from 'react'
import Chats from '../components/Chats/Chats.jsx'
import './Layout.css'
import LeftPanel from '../components/LeftPanel'
import Friends from '../components/Friends/Friends'
import Profile from '../components/Profile/Profile'

export default function Layout() {
    const [window, setWindow] = useState('chats');
    return (
        <div className="layout">
            <LeftPanel active={window} setWindow={setWindow}></LeftPanel>
            {window == 'chats' && <Chats></Chats>}
            {window == 'profile' && <Profile></Profile>}
            {window == 'people' && <Friends></Friends>}
        </div>
    )
}
