import React from 'react'
export default function Footer(){
  return (
    <footer className="border-t border-[rgba(255,255,255,0.03)] mt-8">
      <div className="max-w-6xl mx-auto px-6 py-8 text-sm text-[rgba(255,255,255,0.45)]">
        © {new Date().getFullYear()} Nocturiis. Tous droits réservés.
      </div>
    </footer>
  )
}
