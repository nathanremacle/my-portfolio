import React, { useEffect, useState } from 'react'
import FeaturedProjects from '../widgets/FeaturedProjects'

export default function Hero(){
  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div>
          <h1 className="text-6xl md:text-7xl font-extrabold leading-tight">Construisons des logiciels solides et élégants</h1>
          <p className="mt-6 text-[rgba(255,255,255,0.6)] max-w-xl">
            Ingénieur logiciel passionné par les systèmes robustes, les outils développeurs et l'open-source. J'aime transformer des idées en produits utiles.
          </p>
          <div className="mt-8 flex gap-4">
            <a href="/projects" className="btn-primary">Voir les projets</a>
            <a href="/contact" className="rounded-full px-4 py-2 border border-[rgba(255,255,255,0.06)]">Me contacter</a>
          </div>
        </div>

        <div>
          <FeaturedProjects />
        </div>
      </div>
    </section>
  )
}
