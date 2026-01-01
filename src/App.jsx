import React, { useState } from 'react'
import Layout from './Layout/Layout.jsx'
import './App.css'
import { useAuth } from './Auth/Auth.jsx'
import server from './Server/Server.js';
import Login from './login.jsx';
import Signup from './Signup.jsx';

export default function App() {

  const { user, login } = useAuth();
  const [page, setPage] = useState(user ? 'app' : 'login')

  if (user) return (
    <div className="app-container">
      <Layout></Layout>
    </div>
  )

  if (page == 'login') return <Login setPage={setPage}></Login>
  else return <Signup></Signup>




}
