"use client"

import { useEffect } from 'react'
import { CheckCircle, Clock } from 'lucide-react'

interface ComingSoonToastProps {
  isVisible: boolean
  onClose: () => void
  feature: string
}

export default function ComingSoonToast({ isVisible, onClose, feature }: ComingSoonToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose()
      }, 3000) // Auto close after 3 seconds

      return () => clearTimeout(timer)
    }
  }, [isVisible, onClose])

  if (!isVisible) return null

  return (
    <div className="fixed top-20 right-4 z-50 animate-in slide-in-from-top-2 duration-300">
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex items-center gap-3 min-w-[280px]">
        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
          <Clock className="w-4 h-4 text-blue-600" />
        </div>
        <div className="flex-1">
          <p className="font-medium text-gray-900">{feature} Coming Soon!</p>
          <p className="text-sm text-gray-500">We're working on this feature</p>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}
