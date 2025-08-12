import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Header({ dark, setDark }) {
  return (
    <header className="border-b border-[rgba(255,255,255,0.03)]">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-[linear-gradient(180deg,#4f46e5,#4338ca)] flex items-center justify-center text-white font-bold">N</div>
          <div className="font-semibold">Nocturiis</div>
          <nav className="ml-6 space-x-4 hidden md:inline-block">
            <NavLink to="/" className={({isActive})=> isActive? 'text-accent-500':'text-[rgba(255,255,255,0.7)]'}>Accueil</NavLink>
            <NavLink to="/projects" className={({isActive})=> isActive? 'text-accent-500 ml-4':'ml-4 text-[rgba(255,255,255,0.7)]'}>Projets</NavLink>
            <NavLink to="/about" className="ml-4 text-[rgba(255,255,255,0.7)]">À propos</NavLink>
            <NavLink to="/contact" className="ml-4 text-[rgba(255,255,255,0.7)]">Contact</NavLink>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={()=> setDark(!dark)} className="p-2 rounded-md border border-[rgba(255,255,255,0.03)]">
            {dark ? '🌙' : '🔆'}
          </button>
          <NavLink to="/admin" className="px-3 py-1 rounded-md bg-[rgba(255,255,255,0.02)]">Admin</NavLink>
        </div>
      </div>
    </header>
  )
}
