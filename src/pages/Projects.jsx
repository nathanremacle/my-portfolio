import React, { useEffect, useMemo, useState } from 'react'
import ProjectCard from '../components/ProjectCard'
import { mergeWithGithubData } from '../utils/github'

export default function Projects(){
  const [projects, setProjects] = useState([])
  const [q, setQ] = useState('')
  const [langFilter, setLangFilter] = useState('all')
  const [sort, setSort] = useState('updated')

  useEffect(()=>{
    let mounted = true
    async function load(){
      const res = await fetch('/src/data/projects.json')
      const local = await res.json()
      const merged = await mergeWithGithubData(local, import.meta.env.VITE_GH_USER)
      if(mounted) setProjects(merged)
    }
    load()
    return ()=> mounted=false
  },[])

  const filtered = useMemo(()=>{
    return projects.filter(p=>{
      if(q && !((p.name||'').toLowerCase().includes(q.toLowerCase()) || (p.description||'').toLowerCase().includes(q.toLowerCase()))) return false
      if(langFilter !== 'all' && ((p.language||'').toLowerCase() !== langFilter.toLowerCase())) return false
      return true
    }).sort((a,b)=>{
      if(sort === 'updated') return (b.date || '') > (a.date || '') ? 1 : -1
      if(sort === 'stars') return (b.stargazers_count||0) - (a.stargazers_count||0)
      return 0
    })
  },[projects,q,langFilter,sort])

  // gather languages for filter
  const langs = Array.from(new Set(projects.map(p=>p.language).filter(Boolean)))

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-semibold mb-6">Mes projets GitHub</h2>

      <div className="flex gap-4 items-center mb-8">
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Rechercher un projet..." className="flex-1 rounded-md px-4 py-2 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.03)]"/>
        <select value={langFilter} onChange={e=>setLangFilter(e.target.value)} className="rounded-md px-3 py-2 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.03)]">
          <option value="all">all</option>
          {langs.map(l=> <option key={l} value={l}>{l}</option>)}
        </select>
        <select value={sort} onChange={e=>setSort(e.target.value)} className="rounded-md px-3 py-2 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.03)]">
          <option value="updated">Mis à jour</option>
          <option value="stars">Stars</option>
        </select>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {filtered.map(p => <ProjectCard key={p.repo || p.name} project={p} />)}
      </div>
    </section>
  )
}
