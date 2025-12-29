import React, { useState } from 'react'
import Layout from './Layout/Layout.jsx'
import './App.css'
import { useAuth } from './Auth/Auth.jsx'
import server from './Server/Server.js';

export default function App() {
  const { user, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState('');

  if (user) return (
    <div className="app-container">
      <Layout></Layout>
    </div>
  )

  async function handleLogin() {

    const [res, ok] = await server('/login', { method: 'post', body: JSON.stringify({ email: email, password: password }) });
    if (ok) {
      login(res.user);
    }
    else {
      setMessage("username already exist");
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
            <input required value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder='Email adress' type="email" name='email' id='email' />
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
