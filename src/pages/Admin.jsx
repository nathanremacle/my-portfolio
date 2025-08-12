import React, { useEffect, useState } from 'react'

export default function Admin(){
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    fetch('/src/data/projects.json')
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false) })
      .catch(()=> { setLoading(false) })
  },[])

  function updateItem(i, key, val) {
    const next = [...data]
    next[i] = {...next[i], [key]: val}
    setData(next)
    localStorage.setItem('portfolio_projects_edited', JSON.stringify(next))
  }

  function addProject(){
    setData(prev => {
      const next = [...prev, { name: 'nouveau-projet', repo:'', featured:false, tags:[], language:'', date:'', description:'' }]
      localStorage.setItem('portfolio_projects_edited', JSON.stringify(next))
      return next
    })
  }

  function downloadJson(){
    const blob = new Blob([JSON.stringify(data, null, 2)], {type:'application/json'})
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'projects.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  if(loading) return <div className="p-6">Chargement...</div>

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Admin • Projets</h2>
        <div className="flex gap-3">
          <button onClick={addProject} className="px-3 py-2 rounded-md border">Ajouter</button>
          <button onClick={downloadJson} className="px-3 py-2 rounded-md bg-[rgba(255,255,255,0.02)]">Télécharger JSON</button>
        </div>
      </div>

      <div className="mt-8 space-y-4">
        {data.map((p, i) => (
          <div key={i} className="card flex items-center justify-between">
            <div className="flex-1 mr-4">
              <input value={p.name} onChange={e=>updateItem(i,'name',e.target.value)} className="w-full bg-transparent border-b mb-2" />
              <input value={p.repo} onChange={e=>updateItem(i,'repo',e.target.value)} placeholder="repo sur GitHub" className="w-1/2 bg-transparent border-b mb-2" />
              <input value={p.description} onChange={e=>updateItem(i,'description',e.target.value)} placeholder="description" className="w-full bg-transparent border-b mb-2" />
              <div className="mt-2">
                <input value={p.tags?.join(',')||''} onChange={e=>updateItem(i,'tags', e.target.value.split(',').map(s=>s.trim()).filter(Boolean))} placeholder="tags séparés par ,"/>
              </div>
            </div>
            <div className="text-right">
              <label className="flex items-center gap-2"><input type="checkbox" checked={p.featured} onChange={e=>updateItem(i,'featured', e.target.checked)} /> Vedette</label>
              <div className="mt-4 text-xs text-[rgba(255,255,255,0.5)]">{p.language} · {p.date}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-sm text-[rgba(255,255,255,0.55)]">
        Les modifications sont sauvegardées localement (localStorage). Pour publier définitivement, télécharge le JSON et remplace <code>src/data/projects.json</code> dans ton repo puis commit/push.
      </div>
    </section>
  )
}
