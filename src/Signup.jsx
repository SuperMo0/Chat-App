import { React, useState } from 'react'
import { useAuth } from './Auth/Auth';
import server from './Server/Server';

export default function Signup({ setPage }) {

    const [email, setemail] = useState("");

    const [name, setName] = useState("");

    const [password, setPassword] = useState("");

    const [message, setMessage] = useState('');

    const { login } = useAuth();


    async function handleSignup() {
        const [res, ok] = await server('/signup', { method: 'post', body: JSON.stringify({ email: email, password: password, name: name }) });
        if (ok) {
            login(res.user);
        }
        else {
            setMessage("Email already Exist");
        }
    }

    return (
        <div className="app-container">
            <div className="center">
                <form className='login-form' action="/login">
                    <h1>Welcome to chat 💬</h1>
                    <p>{message}</p>
                    <div className="flex">
                        <input required value={email} onChange={(e) => { setemail(e.target.value) }} placeholder='Email' type="text" name='Email' id='Email' />
                    </div>
                    <div className="flex">
                        <input required value={name} onChange={(e) => { setName(e.target.value) }} placeholder='Name' type="text" name='name' id='name' />
                    </div>
                    <div className="flex">
                        <input required value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder='password' type="password" name='password' id='password' />
                    </div>
                    <button type='button' onClick={handleSignup} className='button'>Enter</button>
                    <p>already have an account? <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => { setPage('login') }}>login</span></p>
                </form>
            </div>
        </div>


    )



}
