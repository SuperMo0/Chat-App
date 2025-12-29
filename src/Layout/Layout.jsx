import React, { createContext, useContext, useEffect, useState } from 'react'
import Chats from '../components/Chats/Chats.jsx'
import './Layout.css'
import LeftPanel from '../components/LeftPanel/LeftPanel.jsx'
import Friends from '../components/Friends/Friends'
import Profile from '../components/Profile/Profile'
import { useAuth } from '../Auth/Auth.jsx'
import useSocket from '../Socket/Socket.jsx'
import server from '../Server/Server.js'

const DataProvider = createContext()

export default function Layout() {
    const [window, setWindow] = useState('chats');

    const { user, login } = useAuth();

    const { connected, socket, message, } = useSocket();

    const [friends, setFriends] = useState(null)

    const [chat, setChat] = useState(0);

    useEffect(() => {
        async function getFriends() {
            const [res, ok] = await server('/friends');
            setFriends(res.friends.map((f) => {
                f.notification = 0;
                return f;
            }));
        }
        getFriends();
    }, [])

    useEffect(() => {
        if (!message) return;
        if (message && (message.receiver == chat || (message.receiver == user.id && message.message.usersId == chat))) {
            return;
        }
        if (message.message.usersId == user.id) return;

        let friend = message.message.usersId;
        setFriends(friends.map((f) => {
            if (f.id == friend) f.notification++;
            return f;
        }))

    }, [message])

    function openChat(id) {
        setChat(id);
        setWindow('chats');
        setFriends(friends.map((f) => {
            if (f.id == id) f.notification = 0;
            return f;
        }))
    }

    if (!connected || !friends) return <h1>Loading....</h1>

    return (
        <DataProvider value={{ openChat, chat, friends, socket, message }}>
            <div className="layout">
                <LeftPanel active={window} setWindow={setWindow} ></LeftPanel>
                {window == 'chats' && <Chats key={chat}></Chats>}
                {window == 'profile' && <Profile></Profile>}
                {window == 'people' && <Friends></Friends>}
            </div>
        </DataProvider>
    )
}

export function useData() { return useContext(DataProvider) };
