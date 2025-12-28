import React, { useContext, useEffect, useState } from 'react'
import { createContext } from 'react'
import server from './../Server/Server.js'

const AuthContext = createContext();
export default function Auth({ children }) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    function login(user) {
        setUser(user);
    }
    useEffect(() => {
        async function checkCreditential() {
            const [message, ok] = await server('/session');
            if (ok) {
                setUser(message.user);
                return;
            }
        }

        // checkCreditential();
        setUser('mowafak');
        setLoading(false);

    }, [])
    if (loading) return <h1>Loading...</h1>
    return (
        <AuthContext value={{ user, login }}>
            {children}
        </AuthContext>
    )
}
export const useAuth = () => useContext(AuthContext);
