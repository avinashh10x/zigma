"use client";
import React, { useRef } from "react";

function Hero2() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      <section
        ref={rootRef}
        className="relative h-screen overflow-hidden bg-background text-foreground flex items-center justify-center"
      >
        <div
          className="absolute top-[45%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 h-[150%] w-[100%] 
             bg-radial from-background via-primary/50 to-primary"
        />
        {/* <div
        className="absolute top-[50%] left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 h-[120%] w-[105%] rounded-full"
        style={{
          boxShadow: `
            0 0 80px 10px rgba(0, 48, 221, 0.5),
            inset 0 0 60px 10px rgba(0, 48, 221, 0.3)
          `
        }}
      /> */}
        <div
          className="absolute top-[50%] left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 h-[120%] w-[105%] scale-100 rounded-full"
          style={{
            boxShadow: `
            0 0 80px 10px rgba(0, 48, 221, 0.5),
            inset 0 0 60px 10px rgba(0, 48, 221, 0.1)
          `,
          }}
        />
        <div
          className="absolute top-[50%] left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 h-[120%] w-[105%] scale-93 rounded-full"
          style={{
            boxShadow: `
            0 0 80px 10px rgba(0, 48, 221, 0.5),
            inset 0 0 60px 10px rgba(0, 48, 221, 0.1)
          `,
          }}
        />

        <div className="absolute -bottom-10 left-0 z-10 h-full w-full bg-gradient-to-t from-background via-background/70 via-background/1  to-transparent " />

        <div className="absolute top-0 left-1/2 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-20 h-[150%] aspect-square bg-radial from-background/80 via-background/1 via-transparent via-transparent  to-transparent" />

        {/* Center Content */}
        <div className="!max-w-[90%] absolute top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 mx-auto px-16 text-center space-y-7 ">
          {/* Eyebrow Text */}
          <p className="text-xs md:text-sm uppercase tracking-widest text-muted-foreground font-mono">
            Paste-ready Figma UI
          </p>

          {/* Main Heading - Sans Serif */}
          <h1 className="text-5xl md:text-7xl lg:text-7xl font-bold tracking-tight font-['Oswald'] leading-[0.9]  uppercase">
            Copy.Paste.Ship
            <br />
            UI faster in Figma
          </h1>

          {/* Subheading - Serif */}
          <p className="max-w-2xl mx-auto text-lg md:text-xl lg:text-2xl leading-relaxed text-muted-foreground font-serif italic">
            Copy once, paste into Figma, and customize instantly <br /> frames,
            text, auto-layout, everything works.
          </p>
        </div>
      </section>

      <div className="w-full h-full items-center justify-center flex -translate-y-[40%] z-10 relative">
 <svg width="1024" height="660" viewBox="0 0 1024 660" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="metal_finish" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#C0C0C0"/>
      <stop offset="20%" stop-color="#E0E0E0"/>
      <stop offset="50%" stop-color="#F5F5F5"/>
      <stop offset="80%" stop-color="#E0E0E0"/>
      <stop offset="100%" stop-color="#C0C0C0"/>
    </linearGradient>

    <clipPath id="screen_area">
      <rect x="50" y="50" width="924" height="560" rx="14" />
    </clipPath>

    <filter id="housing_shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="10" stdDeviation="15" flood-color="#000" flood-opacity="0.25"/>
    </filter>
  </defs>

  <g filter="url(#housing_shadow)">
    
    <rect x="30" y="30" width="964" height="600" rx="24" fill="url(#metal_finish)" stroke="#A0A0A0" stroke-width="1"/>

    <rect x="34" y="34" width="956" height="592" rx="20" fill="#050505"/>

    <g clip-path="url(#screen_area)">
      <image href="./frame.webp" 
             x="34" y="34" width="956" height="600" preserveAspectRatio="xMidYMid slice" />
    </g>

    <g transform="translate(432, 34)">
        <path d="M0 0 H160 V32 C160 40.8 152.8 48 144 48 H16 C7.2 48 0 40.8 0 32 V0 Z" fill="#050505"/>
        
        <circle cx="80" cy="24" r="6" fill="#151515" stroke="#222" stroke-width="1"/> <circle cx="80" cy="24" r="3" fill="#080808"/> <circle cx="81" cy="23" r="1" fill="#444" opacity="0.5"/> <rect x="100" y="20" width="8" height="8" rx="2" fill="#111"/>

        <circle cx="56" cy="24" r="2" fill="#00FF00" opacity="0.9">
             <animate attributeName="opacity" values="0.9;0.4;0.9" dur="4s" repeatCount="indefinite" />
        </circle>
    </g>
  </g>
</svg>
      </div>
    </>
  );
}

export default Hero2;
