import { React, useState, useEffect } from 'react'
import './FriendsList.css'
import FriendInfo from './FriendInfo'
import { useData } from '../Layout/Layout';
import server from '../Server/Server';
import { useAuth } from '../Auth/Auth';


export default function FriendsList() {

    const { openChat, message, chat, newFriend } = useData();

    const [friends, setFriends] = useState(null);

    const { user } = useAuth();

    useEffect(() => {
        async function getFriends() {
            const [res, ok] = await server('/friends');
            setFriends(res.friends.map(f => { f.notification = 0; return f }));
        }
        getFriends();
    }, [])

    useEffect(() => {
        if (!newFriend) return;
        if (friends && friends[friends.length - 1].id == newFriend.id) return;
        setFriends([...friends, newFriend]);
    })

    useEffect(() => {
        if (!message) return;

        let chatId = message.chatId;

        if (chatId == chat.chatId || message.message.users.id == user.id) return;

        setFriends(friends.map((f) => {
            if (f.chatId == chatId) f.notification++;
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
