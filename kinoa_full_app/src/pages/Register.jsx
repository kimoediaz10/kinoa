import React, {useState} from 'react'
import { supabase } from '../supabaseClient'
import { useNavigate } from 'react-router-dom'

export default function Register(){
  const [name,setName]=useState('')
  const [phone,setPhone]=useState('')
  const [email,setEmail]=useState('')
  const [birthday,setBirthday]=useState('')
  const [loading,setLoading]=useState(false)
  const nav = useNavigate()

  async function handleCreate(e){
    e.preventDefault()
    setLoading(true)
    try{
      const { data, error } = await supabase
        .from('clients')
        .insert([{ name, phone, email, birthday }])
        .select()
      if (error) throw error
      const id = data[0].id
      nav(`/card/${id}`)
    }catch(err){
      alert('Error: '+err.message)
    }finally{ setLoading(false) }
  }

  return (
    <div style={{maxWidth:420,margin:'20px auto'}}>
      <div className="card">
        <img src="/logo.png" alt="logo" className="logo" />
        <h3>Crear Tarjeta</h3>
        <form onSubmit={handleCreate} style={{marginTop:12,display:'grid',gap:8}}>
          <input required placeholder="Nombre" value={name} onChange={e=>setName(e.target.value)} />
          <input required placeholder="Teléfono" value={phone} onChange={e=>setPhone(e.target.value)} />
          <input placeholder="Correo" value={email} onChange={e=>setEmail(e.target.value)} />
          <input placeholder="Fecha de cumpleaños" value={birthday} onChange={e=>setBirthday(e.target.value)} />
          <button className="btn" disabled={loading}>{loading? 'Creando...':'Crear tarjeta'}</button>
        </form>
      </div>
    </div>
  )
}
