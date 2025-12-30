import { React, useState, useEffect } from 'react'
import './FriendsList.css'
import FriendInfo from './FriendInfo'
import { useData } from '../Layout/Layout';
import server from '../Server/Server';


export default function FriendsList() {

    const { openChat, message, chat } = useData();

    const [friends, setFriends] = useState(null);

    useEffect(() => {
        async function getFriends() {
            const [res, ok] = await server('/friends');
            setFriends(res.friends.map(f => { f.notification = 0; return f }));
        }
        getFriends();
    }, [])

    useEffect(() => {
        if (!message) return;

        let friend = message.message.usersId;

        if (message.chatId == chat.chatId || friend == user.id) return;

        setFriends(friends.map((f) => {
            if (f.id == friend) f.notification++;
            return f;
        }))
    }, [message])

    function handleOpenChat(chat) {
        openChat(chat);
        setFriends(friends.map((friend) => {
            if (friend.id == chat.friend.id) friend.notification = 0;
            return friend;
        }))
    }

    if (!friends) return <h1>Loading...</h1>

    return (
        <div className="friends-list">
            {friends.map((friend) => {
                return <FriendInfo key={friend.id} handleOpenChat={handleOpenChat} friend={friend}></FriendInfo>
            })}
        </div>
    )
}
