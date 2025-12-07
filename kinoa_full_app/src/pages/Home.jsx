import React from 'react'
import { Link } from 'react-router-dom'
export default function Home(){
  return (
    <div style={{maxWidth:720,margin:'0 auto',textAlign:'center'}}>
      <img src="/logo.png" alt="KINOA" style={{height:80}} />
      <h1>KINOA Rewards</h1>
      <p>Tu lealtad tiene sabor: Fresas con crema gratis al completar la tarjeta</p>
      <div style={{display:'flex',gap:12,justifyContent:'center',marginTop:18}}>
        <Link to="/register"><button className="btn">Crear tarjeta</button></Link>
        <a href="/admin"><button style={{background:'#222',color:'#fff'}} className="btn">Ir al panel</button></a>
      </div>
    </div>
  )
}
