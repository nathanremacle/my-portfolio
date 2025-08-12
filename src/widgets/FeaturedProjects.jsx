import React, { useEffect, useState } from 'react'
import { mergeWithGithubData } from '../utils/github'

// small featured card list (reads from local projects.json and shows featured ones)
export default function FeaturedProjects(){
  const [featured, setFeatured] = useState([])

  useEffect(()=>{
    let mounted = true
    async function load(){
      // load local metadata first
      const res = await fetch('/src/data/projects.json')
      const local = await res.json()
      const f = local.filter(p => p.featured).slice(0,4)
      // merge quickly with GitHub (stars/forks) but don't block UI
      const merged = await mergeWithGithubData(f)
      if(mounted) setFeatured(merged)
    }
    load()
    return ()=> mounted=false
  },[])

  return (
    <div className="card">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-sky-300">★</div>
          <div className="font-semibold">Projets en vedette</div>
        </div>
      </div>

      <div className="space-y-4">
        {featured.map(p => (
          <div key={p.repo} className="p-4 border border-[rgba(255,255,255,0.02)] rounded-lg bg-[rgba(255,255,255,0.01)]">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-semibold text-lg">{p.name}</div>
                <div className="text-[rgba(255,255,255,0.5)] text-sm mt-1">{p.description}</div>
                <div className="mt-3 flex gap-2 flex-wrap">
                  {(p.tags||[]).map(t => <span className="tag" key={t}>{t}</span>)}
                </div>
              </div>
              <div className="text-sm text-[rgba(255,255,255,0.5)] flex flex-col items-end gap-2">
                <a href={p.html_url || '#'} target="_blank" rel="noreferrer" className="text-[rgba(255,255,255,0.6)]">Détails ↗</a>
                <div className="text-xs">{p.language || ''}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
