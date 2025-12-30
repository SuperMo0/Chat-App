import React, { useState } from 'react'
import Layout from './Layout/Layout.jsx'
import './App.css'
import { useAuth } from './Auth/Auth.jsx'
import server from './Server/Server.js';
import Login from './login.jsx';

export default function App() {

  const { user, login } = useAuth();

  if (user) return (
    <div className="app-container">
      <Layout></Layout>
    </div>
  )

  return <Login></Login>




}
