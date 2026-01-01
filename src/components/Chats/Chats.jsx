import React, { useState, useEffect, useOptimistic, useRef } from 'react'
import './Chats.css'
import FriendInfo from './../FriendInfo'
import server from '../../Server/Server';
import { useData } from '../../Layout/Layout';
import { useAuth } from '../../Auth/Auth';
import { IoSendSharp } from "react-icons/io5";



export default function Chats() {

    const { user } = useAuth();

    const { chat, socket, message } = useData();

    const [chatMessages, setChatMessages] = useState([]);

    const [text, setText] = useState('');

    const chatRef = useRef();

    const lastMessage = useRef();

    useEffect(() => {
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
    })

    useEffect(() => {
        let active = true;
        async function getChatMesages() {
            const [res, ok] = await server(`/chats/${chat.chatId}`);
            if (active)
                setChatMessages(res.messages);
        }
        getChatMesages();
        return () => { active = false }
    }, [chat])


    useEffect(() => {
        if (!message || message?.type != 'message') return;

        if (message.chatId == chat.chatId && lastMessage.current != message.message.id) {
            setChatMessages((c) => [...c, message.message]);
            lastMessage.current = message.message.id;
        }
    }, [message])

    const friend = chat.friend;

    function sendMessage(e) {
        e.preventDefault();
        let data = {
            chatId: chat.chatId,
            content: text,
            friendId: chat.friend.id,
        }
        socket.send(JSON.stringify(data));
        setText("");
    }
    return (
        <div className="chat-container">
            <FriendInfo friend={friend} />

            <div ref={chatRef} className="messages-container">

                {chatMessages && chatMessages.map((m) => {
                    if (m.usersId == user.id) {
                        return (
                            <div key={m.id} className="message-container right">
                                <div className="content-container blue">
                                    <p>{m.content}</p>
                                </div>
                                <p className='message-date'>{new Date(m.created_at).toLocaleTimeString()}</p>
                            </div>
                        )
                    }
                    else {
                        return (
                            <div key={m.id} className="message-container left">
                                <p className='username-global-chat'>{m.users.name}</p>
                                <div className="flex">
                                    <img src={m.users.image} alt="" />
                                    <div className="content-container grey">
                                        <p>{m.content}</p>
                                    </div>
                                </div>
                                <p className='message-date'>{new Date(m.created_at).toLocaleTimeString()}</p>
                            </div>
                        )
                    }
                })}

            </div>
            <form onSubmit={sendMessage} className='input-containe' action="">
                <input name='message' placeholder='type a message....' value={text} onChange={(e) => { setText(e.target.value) }} type="text" />
                <button style={{ border: "none" }} type='submit'>
                    <div className="cricle center">
                        <IoSendSharp className='send-icon'></IoSendSharp>
                    </div>
                </button>
            </form>


        </div>

    )
}
