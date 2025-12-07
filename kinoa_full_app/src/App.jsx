import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import Card from './pages/Card'
import Admin from './pages/Admin'

export default function App(){
  return (
    <>
      <header className="header">
        <div style={{fontWeight:800}}>KINOA Helados y Cafetería</div>
        <nav style={{display:'flex',gap:8}}>
          <Link to="/">Home</Link>
          <Link to="/register">Crear</Link>
          <Link to="/admin">Panel</Link>
        </nav>
      </header>
      <main className="container">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/card/:id" element={<Card/>} />
          <Route path="/admin" element={<Admin/>} />
        </Routes>
      </main>
    </>
  )
}
