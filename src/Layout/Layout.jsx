import { createContext, useContext, useState } from 'react'
import Chats from '../components/Chats/Chats.jsx'
import './Layout.css'
import LeftPanel from '../components/LeftPanel/LeftPanel.jsx'
import People from '../components/Friends/People.jsx'
import Profile from '../components/Profile/Profile'
import useSocket from '../Socket/Socket.jsx'

const DataProvider = createContext()

export default function Layout() {

    const [window, setWindow] = useState('chats');

    const { connected, socket, message, } = useSocket();

    const [chat, setChat] = useState({ chatId: 0, friend: { name: 'global', image: 'https://www.shutterstock.com/image-vector/world-chat-icon-flat-illustration-260nw-1471535438.jpg', notification: 0, isOnline: true } });

    function openChat(chat) {
        setChat(chat);
        setWindow('chats');
    }

    if (!connected) return <h1>Loading....</h1>

    return (
        <DataProvider value={{ openChat, chat, socket, message }}>
            <div className="layout">
                <LeftPanel active={window} setWindow={setWindow} ></LeftPanel>
                {window == 'chats' && <Chats key={chat.chatId}></Chats>}
                {window == 'profile' && <Profile></Profile>}
                {window == 'people' && <People></People>}
            </div>
        </DataProvider>
    )
}

export function useData() { return useContext(DataProvider) };
