'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import FeatureCards from '@/components/FeatureCards'
import Announcement from '@/components/Announcement'
import SideToolbar from '@/components/SideToolbar'
import Footer from '@/components/Footer'

export default function Home() {
  const [activeTab, setActiveTab] = useState('home')

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <main>
        <HeroSection />
        <Announcement />
        <FeatureCards />
      </main>
      <SideToolbar />
      <Footer />
    </div>
  )
}
