import React, {useEffect, useState} from 'react'
import { supabase } from '../supabaseClient'

export default function Admin(){
  const [clients, setClients] = useState([])
  const [q,setQ]=useState('')

  useEffect(()=>{ load() },[])
  async function load(){
    const { data } = await supabase.from('clients').select('*').order('created_at',{ascending:false}).limit(200)
    setClients(data || [])
  }

  async function addVisitManually(clientId){
    const { data: current, error: selErr } = await supabase.from('clients').select('visits').eq('id', clientId).single();
    if (selErr) { alert('Error al leer cliente: '+selErr.message); return; }
    const newVisits = (current.visits || 0) + 1;
    const { error: updErr } = await supabase.from('clients').update({ visits: newVisits }).eq('id', clientId);
    if (updErr) { alert('Error al actualizar visitas: '+updErr.message); return; }
    await supabase.from('visits_history').insert([{ client_id: clientId, added_by: 'admin', method: 'manual' }]);
    load();
  }

  const filtered = clients.filter(c => c.name?.toLowerCase().includes(q.toLowerCase()) || c.phone?.includes(q) || c.email?.includes(q))

  return (
    <div style={{maxWidth:920,margin:'20px auto'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <h2>Panel administrador</h2>
        <input placeholder="Buscar" value={q} onChange={e=>setQ(e.target.value)} />
      </div>
      <div style={{marginTop:12}}>
        {filtered.map(c=>(
          <div key={c.id} style={{padding:12,background:'#fff',borderRadius:8,display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
            <div>
              <div style={{fontWeight:700}}>{c.name}</div>
              <div style={{color:'#666'}}>Visitas: {c.visits || 0}</div>
            </div>
            <div>
              <button className="btn" onClick={()=>addVisitManually(c.id)}>Sumar visita</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
