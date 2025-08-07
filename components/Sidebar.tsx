"use client"

import { useState } from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import ComingSoonToast from './ComingSoonToast'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const menuItems = [
  { name: 'Dashboard', active: true, comingSoon: false },
  { name: 'Transactions', active: false, comingSoon: true },
  { name: 'Reports', active: false, comingSoon: true },
  { name: 'Settings', active: false, comingSoon: true },
]

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [toastVisible, setToastVisible] = useState(false)
  const [selectedFeature, setSelectedFeature] = useState('')

  const handleMenuClick = (item: typeof menuItems[0]) => {
    if (item.comingSoon) {
      setSelectedFeature(item.name)
      setToastVisible(true)
      // Close mobile sidebar when clicking a menu item
      if (window.innerWidth < 1024) {
        onClose()
      }
    }
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-[#FCFDFD] transform transition-transform duration-200 ease-in-out z-50",
          // Mobile behavior: slide in/out
          "lg:transition-transform lg:duration-200 lg:ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-6 lg:hidden">
            <span className="font-semibold">Menu</span>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleMenuClick(item)}
                className={cn(
                  "w-full text-left px-3 py-2 rounded-3xl transition-colors relative",
                  item.active
                    ? "bg-[#3867762f] text-[#3A6C7B] font-medium"
                    : "text-gray-600 hover:bg-gray-50",
                  item.comingSoon && !item.active && "cursor-pointer"
                )}
              >
                <div className="flex items-center justify-between">
                  <span>{item.name}</span>
                </div>
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Coming Soon Toast */}
      <ComingSoonToast
        isVisible={toastVisible}
        onClose={() => setToastVisible(false)}
        feature={selectedFeature}
      />
    </>
  )
}
