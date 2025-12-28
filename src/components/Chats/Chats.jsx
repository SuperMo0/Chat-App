import React, { useState, useEffect } from 'react'
import './Chats.css'
import FriendInfo from './../FriendInfo'
import server from '../../Server/Server';
import { useData } from '../../Layout/Layout';
import useSocket from '../../Socket/Socket';

export default function Chats() {

    const { chat, chatMessages, socket } = useData();
    const [text, setText] = useState('')

    if (!chat) return (
        <div className="center select-start">
            <p>select a friend to start chating</p>
        </div>
    )
    console.log(chatMessages);
    if (!chatMessages) return <h1>Loading...</h1>

    function sendMessage() {
        let data = {
            receiver: chat,
            content: text,
        }
        socket.send(JSON.stringify(data));
    }
    return (
        <div className="container">
            {chatMessages.map((m) => {
                return <p>{m.content}</p>
            })}
            <input value={text} onChange={(e) => { setText(e.target.value) }} type="text" />
            <button onClick={sendMessage}>Send</button>
        </div>

    )
}
