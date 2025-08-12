import React from 'react'
import Hero from '../sections/Hero'

export default function Home(){
  return (
    <div>
      <Hero />
      {/* zone “ouvert aux opportunités” */}
      <section className="bg-[rgba(255,255,255,0.02)] mt-10">
        <div className="max-w-6xl mx-auto px-6 py-14 flex justify-between items-center">
          <p className="text-[rgba(255,255,255,0.5)]">Je suis ouvert aux opportunités freelances et projets open-source.</p>
          <a href="/contact" className="btn-primary">Discutons</a>
        </div>
      </section>
    </div>
  )
}
