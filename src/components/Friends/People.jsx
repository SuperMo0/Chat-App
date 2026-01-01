import React, { useEffect, useState } from 'react'
import './People.css'
import Search from '../Search/Search'
import FriendInfo from '../FriendInfo'
import server from '../../Server/Server'
export default function People({ SetNewFriend }) {

    const [people, SetPeople] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function getPeople() {
            const [res, ok] = await server('/people');

            if (ok) SetPeople(res.people.map((p) => { p.added = false; return p }));
            else setError('there was an error please try refreshing the page');
        }
        getPeople();
    }, [])

    async function handleAdd(person) {
        const [res, ok] = await server(`/friends/${person.id}`, { method: 'post' });
        SetPeople(people.map((p) => { if (p.id == person.id) p.added = true; return p }));
        res.newFriend.notification = 0;
        SetNewFriend(res.newFriend);
    }

    if (error) return <p>{error}</p>
    return (
        <div className="friends-tab">
            <Search id={'people'} placeholder={'Search for People....'}></Search>
            <div className="users">
                {people ?
                    people.map((person) => {
                        return (
                            <div key={person.id} className="user">
                                <FriendInfo friend={{ ...person, notification: 0 }} handleOpenChat={() => { }}></FriendInfo>
                                <button disabled={person.added} onClick={() => { handleAdd(person) }} className='button add'>{person.added ? "Added" : "Add"}</button>
                            </div>
                        )
                    }) : <p>Loading...</p>
                }

            </div>

        </div>
    )
}
