import React from 'react'
import Chats from '../components/Chats'
import './Layout.css'
import LeftPanel from '../components/LeftPanel'
import Friends from '../components/Friends/Friends'
import Profile from '../components/Profile/Profile'

export default function Layout() {
    return (
        <div className="layout">
            <LeftPanel></LeftPanel>
            <Profile></Profile>
        </div>
    )
}
