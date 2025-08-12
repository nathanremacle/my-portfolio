import React from 'react'

export default function ProjectCard({ project }){
  const p = project || {}
  return (
    <article className="card">
      <div className="flex justify-between">
        <div>
          <div className="font-semibold text-lg">{p.name}</div>
          <div className="text-[rgba(255,255,255,0.5)] mt-2">{p.description}</div>
          <div className="mt-4 flex gap-2 flex-wrap">
            {(p.tags || []).map(t => <span className="tag" key={t}>{t}</span>)}
          </div>
          <div className="text-xs text-[rgba(255,255,255,0.45)] mt-3">{p.language || ''}</div>
        </div>

        <div className="text-right">
          <div className="text-sm text-[rgba(255,255,255,0.6)]">
            {p.stargazers_count ? <span>☆ {p.stargazers_count}</span> : null}
            {' '}
            {p.forks_count ? <span>⎇ {p.forks_count}</span> : null}
          </div>
          <div className="mt-6">
            <a href={p.html_url || '#'} target="_blank" rel="noreferrer" className="text-xs">Détails ⤴</a>
            {p.homepage ? <a className="ml-3 text-xs" href={p.homepage} target="_blank" rel="noreferrer">Site</a> : null}
          </div>
        </div>
      </div>
    </article>
  )
}
