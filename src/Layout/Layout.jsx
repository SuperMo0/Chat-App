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


    const [chatMessages, setChatMessages] = useState(null);
    const [chat, setChat] = useState(null);

    useEffect(() => {
        async function getFriends() {
            const [res, ok] = await server('/friends');
            setFriends(res.friends);
        }
        getFriends();
    }, [])


    useEffect(() => {
        if (!chat) return;
        async function getChatMesages() {
            const [res, ok] = await server(`/chats/${chat}`);
            setChatMessages(res.messages);
        }
        getChatMesages();

    }, [chat])

    if (!connected || !friends) return <h1>Loading....</h1>


    return (
        <DataProvider value={{ setChat, chat, friends, chatMessages, socket }}>
            <div className="layout">
                <LeftPanel active={window} setWindow={setWindow} ></LeftPanel>
                {window == 'chats' && <Chats></Chats>}
                {window == 'profile' && <Profile></Profile>}
                {window == 'people' && <Friends></Friends>}
            </div>
        </DataProvider>
    )
}

export function useData() { return useContext(DataProvider) };
