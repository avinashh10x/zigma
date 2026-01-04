"use client"
import React, { useRef } from 'react'

function Hero2() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  return (
    <section
      ref={rootRef}
      className="relative h-screen overflow-hidden bg-background text-foreground flex items-center justify-center"
    >
      {/* Center Content */}
      <div className="max-w-5xl mx-auto px-6 text-center space-y-8">
        {/* Eyebrow Text */}
        <p className="text-xs md:text-sm uppercase tracking-widest text-muted-foreground font-mono">
          Paste-ready Figma UI. No files. No plugins.
        </p>

        {/* Main Heading - Sans Serif */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9] font-sans">
          Copy. Paste. Ship<br />
          UI faster in Figma
        </h1>

        {/* Subheading - Serif */}
        <p className="max-w-2xl mx-auto text-lg md:text-xl lg:text-2xl leading-relaxed text-muted-foreground font-serif italic">
          Copy once, paste into Figma, and customize instantly — frames, text, auto-layout, everything works.
        </p>
      </div>
    </section>
  )
}

export default Hero2
