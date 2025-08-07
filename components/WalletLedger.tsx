"use client"

import { useState } from 'react'
import { MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import SummaryCards from './SummaryCards'
import TransactionTable from './TransactionTable'
import { cn } from '@/lib/utils'

const tabs = ['Overview', 'Transactions']
const users = [
  { name: 'Ava', avatar: '/placeholderimage.png' },
  { name: 'Liam', avatar: '/placeholderimage2.png' },
  { name: 'Noah', avatar: '/placeholderimage3.png' },
  { name: 'Doe', avatar: '/placeholderimage4.png' },
]

interface WalletLedgerProps {
  searchQuery: string
}

export default function WalletLedger({ searchQuery }: WalletLedgerProps) {
  const [activeTab, setActiveTab] = useState('Overview')

  return (
    <div className="p-4 lg:p-6 min-h-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div className="flex items-center gap-3 mb-4 sm:mb-0">
          <h1 className="text-2xl font-bold">Wallet Ledger</h1>
          <div className="w-[75px] h-7 flex items-center justify-center gap-2 bg-[#34616f0e] rounded-3xl">
            <div className="w-2 h-2 bg-[#087A2E] rounded-full"></div>
            <span className="text-sm text-[#1B2528]">Active</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button className="w-[78px] h-[36px] bg-[#4B8B9F] text-[#020303] hover:bg-[#367b91] rounded-3xl">Share</Button>
          <Button className='border border-[#49656e2f] rounded-2xl' variant="ghost" size="icon">
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Users */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex -space-x-2">
          {users.map((user, index) => (
            <Avatar key={index} className="border-2 border-white">
              <AvatarImage src={user.avatar || "/placeholder.svg"} />
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
          ))}
        </div>
        <span className="text-sm text-gray-600">Ava, Liam, Noah +12 others</span>
      </div>

      {/* Tabs */}
      <div className="border-b border-[#49656e2f] mb-6">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "py-2 px-1 border-b-2 font-medium text-sm transition-colors outline-none",
                activeTab === tab
                  ? "border-[#437D8E] text-[#437D8E]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              )}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      {activeTab === 'Overview' && (
        <div className="space-y-6">
          <SummaryCards />
          <TransactionTable searchQuery={searchQuery} />
        </div>
      )}
      {activeTab === 'Transactions' && <TransactionTable searchQuery={searchQuery} />}
    </div>
  )
}
