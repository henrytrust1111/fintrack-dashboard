"use client"

import { useState } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import WalletLedger from './WalletLedger'

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true) // Default to open on desktop
  const [searchQuery, setSearchQuery] = useState('')

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="h-screen bg-[#FCFDFD] overflow-hidden">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-30">
        <Header 
          onMenuClick={toggleSidebar}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      </div>

      <div className="flex h-full pt-16"> {/* pt-16 accounts for fixed header height */}
        {/* Toggleable Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        {/* Scrollable Main Content */}
        <main className={`flex-1 transition-all duration-200 ease-in-out overflow-y-auto ${
          sidebarOpen ? 'lg:ml-64' : 'lg:ml-0'
        }`}>
          <WalletLedger searchQuery={searchQuery} />
        </main>
      </div>
    </div>
  )
}
