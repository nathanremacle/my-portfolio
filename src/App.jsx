import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Admin from './pages/Admin'
import About from './pages/About'
import Contact from './pages/Contact'

export default function App(){
  // control dark-mode on root HTML element
  const [dark, setDark] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('prefers-dark') ?? 'true')
    } catch { return true }
  })

  useEffect(()=>{
    const root = document.documentElement
    if(dark) root.classList.add('dark'); else root.classList.remove('dark')
    localStorage.setItem('prefers-dark', JSON.stringify(dark))
  }, [dark])

  return (
    <div className="min-h-screen flex flex-col">
      <Header dark={dark} setDark={setDark} />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
