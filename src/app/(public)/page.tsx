import About from '@/components/section/1about'
import Hero from '@/components/section/hero'
import Hero2 from '@/components/section/Hero2'
import { ThemeToggle } from '@/components/theme/theme-toggle'
import React from 'react'

function Home() {
  return (
    <div>
        <div className="fixed top-4 right-4 z-50">
          <ThemeToggle />
        </div>

        <Hero2/>
        <About/>
    </div>
  )
}

export default Home