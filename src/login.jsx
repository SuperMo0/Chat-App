import { React, useState } from 'react'
import { useAuth } from './Auth/Auth';
import server from './Server/Server';

export default function Login() {


    const [userName, setUserName] = useState("");

    const [password, setPassword] = useState("");

    const [message, setMessage] = useState('');

    const { login } = useAuth();


    async function handleLogin() {
        const [res, ok] = await server('/login', { method: 'post', body: JSON.stringify({ name: userName, password: password }) });
        if (ok) {
            login(res.user);
        }
        else {
            setMessage("username already exist please try another user name");
        }
    }

    return (
        <div className="app-container">
            <div className="center">
                <form className='login-form' action="/login">
                    <h1>Welcome to chat 💬</h1>
                    <p>if you don't have an account we will create one for you!</p>
                    <p>{message}</p>
                    <div className="flex">
                        <input required value={userName} onChange={(e) => { setUserName(e.target.value) }} placeholder='User Name' type="text" name='name' id='name' />
                    </div>
                    <div className="flex">
                        <input required value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder='password' type="password" name='password' id='password' />
                    </div>
                    <button type='button' onClick={handleLogin} className='button'>Enter</button>
                </form>
            </div>
        </div>


    )
}
