import React, {useEffect, useState, useRef} from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import QRCode from 'qrcode.react'
import confetti from 'canvas-confetti'

export default function Card(){
  const { id } = useParams()
  const [client, setClient] = useState(null)
  const [reward, setReward] = useState('')
  const canvasRef = useRef(null)

  useEffect(()=>{ fetchClient() },[id])

  async function fetchClient(){
    const { data, error } = await supabase.from('clients').select('*').eq('id', id).single()
    if (error) return
    setClient(data)
  }

  function burst() {
    confetti({ particleCount: 80, spread: 120, origin: { y: 0.6 }})
  }

  async function addVisit(method='manual'){
    if(!client) return
    const newVisits = (client.visits || 0) + 1
    // update visits
    const { error } = await supabase.from('clients').update({ visits: newVisits }).eq('id', client.id)
    await supabase.from('visits_history').insert([{ client_id: client.id, added_by: 'self', method }])
    // rewards
    if(newVisits === 5){
      setReward('¡Tienes 50% de descuento en esta compra!')
      burst()
      await supabase.from('rewards').insert([{ client_id: client.id, type: '50% OFF' }])
    }
    if(newVisits ===10){
      setReward('🎉 ¡Fresas con crema GRATIS!')
      confetti({ particleCount: 200, spread: 160, origin: { y: 0.6 }})
      await supabase.from('rewards').insert([{ client_id: client.id, type: 'Fresas con crema GRATIS' }])
      await supabase.from('clients').update({ visits: 0 }).eq('id', client.id)
    }
    fetchClient()
    setTimeout(()=> setReward(''),4000)
  }

  if(!client) return <div style={{maxWidth:420,margin:'20px auto'}}>Cargando…</div>

  return (
    <div style={{maxWidth:420,margin:'20px auto',textAlign:'center'}}>
      <div className="card">
        <img src="/logo.png" alt="KINOA" className="logo" />
        <h3 style={{fontWeight:800}}>{client.name}</h3>
        <p>Visitas: {client.visits || 0}/10</p>
        <div className="stamps">
          {Array.from({length:10}).map((_,i)=>(
            <div key={i} className={'stamp '+(i < (client.visits||0) ? 'filled':'')}>{i+1}</div>
          ))}
        </div>
        {reward && <div className="reward">{reward}</div>}
        <div style={{marginTop:12}}>
          <button className="btn" onClick={()=>addVisit('manual')}>Registrar visita</button>
        </div>
        <div style={{marginTop:14}}>
          <QRCode value={`${window.location.origin}/card/${client.id}`} size={120} />
        </div>
      </div>
    </div>
  )
}
