import React, { useState, useEffect, useOptimistic, useRef } from 'react'
import './Chats.css'
import FriendInfo from './../FriendInfo'
import server from '../../Server/Server';
import { useData } from '../../Layout/Layout';
import useSocket from '../../Socket/Socket';
import { useAuth } from '../../Auth/Auth';
import { RiArrowLeftWideLine } from "react-icons/ri";
import { IoSendSharp } from "react-icons/io5";



export default function Chats() {

    const { user } = useAuth();
    const { chat, socket, friends, message } = useData();
    const [chatMessages, setChatMessages] = useState([]);
    const [text, setText] = useState('');
    const chatRef = useRef();

    useEffect(() => {
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
    })

    useEffect(() => {
        let active = true;
        async function getChatMesages() {
            const [res, ok] = await server(`/chats/${chat}`);
            if (active)
                setChatMessages(res.messages);
        }
        getChatMesages();
        return () => { active = false }
    }, [chat])


    useEffect(() => {
        if (message && (message.receiver == chat || (message.receiver == user.id && message.message.usersId == chat))) {
            console.log(message.message);

            setChatMessages((c) => [...c, message.message]);
        }
    }, [message])


    const friend = friends.find((f) => f.id == chat);

    function sendMessage() {
        let data = {
            receiver: chat,
            content: text,
        }
        socket.send(JSON.stringify(data));
        setText("");
    }
    return (
        <div className="chat-container">
            <FriendInfo friend={friend} >
                <RiArrowLeftWideLine className='left-arrow' />
            </FriendInfo>
            <div ref={chatRef} className="messages-container">

                {chatMessages.map((m) => {
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
                    else if (chat != 0) return (
                        <div key={m.id} className="message-container left">
                            <div className="content-container grey">
                                <p>{m.content}</p>
                            </div>
                            <p className='message-date'>{new Date(m.created_at).toLocaleTimeString()}</p>
                        </div>
                    )
                    else return (
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
                })}


            </div>
            <div className="input-containe">
                <input placeholder='type a message....' value={text} onChange={(e) => { setText(e.target.value) }} type="text" />
                <div className="cricle center">
                    <IoSendSharp onClick={sendMessage} className='send-icon'></IoSendSharp>
                </div>
            </div>

        </div>

    )
}
