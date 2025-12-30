import React, { useEffect, useState } from 'react'
import './People.css'
import Search from '../Search/Search'
import FriendInfo from '../FriendInfo'
export default function People() {

    // const [people,SetPeople]= useState()


    {/*useEffect(()=>{


    },[])*/}
    return (
        <div className="friends-tab">
            <Search placeholder={'Search for People....'}></Search>
            <div className="users">
                <div className="user">
                    {/* <FriendInfo></FriendInfo> */}
                    <button className='button add'>Add</button>
                </div>

            </div>

        </div>
    )
}
