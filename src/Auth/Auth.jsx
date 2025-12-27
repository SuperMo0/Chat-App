import React, { useEffect, useState } from 'react'
import { createContext } from 'react'
import Cookies from 'js-cookie';


const authContent = createContext();
export default function Auth({ children }) {

    const [session, setSession] = useState();


    function login() {


    }

    useEffect(() => {
        let session = Cookies.get('connect.sid');
        console.log(session);
    })
    return (

        children
    )
}
