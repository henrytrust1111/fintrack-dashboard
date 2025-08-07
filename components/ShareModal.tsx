"use client"

import { useState } from 'react'
import { Copy, Mail, MessageSquare, Share2, Check, Users, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
}


export default function ShareModal({ isOpen, onClose }: ShareModalProps) {
  const [copied, setCopied] = useState(false)
  const [selectedPermission, setSelectedPermission] = useState('view')
  
  const shareUrl = 'https://fintrack-dashboard-eight.vercel.app/'
  
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const handleEmailShare = () => {
    const subject = encodeURIComponent('FinTrack Wallet Ledger - Shared with you')
    const body = encodeURIComponent(`Hi,\n\nI've shared my FinTrack Wallet Ledger with you. You can view it here:\n\n${shareUrl}\n\nBest regards`)
    window.open(`mailto:?subject=${subject}&body=${body}`)
  }

  const handleSocialShare = (platform: string) => {
    const text = encodeURIComponent('Check out my FinTrack Wallet Ledger')
    const url = encodeURIComponent(shareUrl)
    
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`)
        break
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`)
        break
      case 'whatsapp':
        window.open(`https://wa.me/?text=${text}%20${url}`)
        break
    }
  }

  const handleExport = () => {
    // Simulate export functionality
    const data = {
      walletLedger: 'Wallet Ledger Data',
      totalBalance: '$12,345',
      totalCredits: '$7,890',
      totalDebits: '$4,455',
      transactions: 150,
      exportDate: new Date().toISOString()
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'fintrack-wallet-ledger.json'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <Dialog  open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md mt-11 overflow-auto h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5" />
            Share Wallet Ledger
          </DialogTitle>
          <DialogDescription>
            Share your wallet ledger with others or export the data
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Permission Settings */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Access Level</Label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setSelectedPermission('view')}
                className={`p-3 rounded-lg border text-left transition-colors ${
                  selectedPermission === 'view' 
                    ? 'border-blue-500 bg-blue-50 text-blue-700' 
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Users className="h-4 w-4" />
                  <span className="font-medium">View Only</span>
                </div>
                <p className="text-xs text-gray-500">Can view transactions and summary</p>
              </button>
              <button
                onClick={() => setSelectedPermission('edit')}
                className={`p-3 rounded-lg border text-left transition-colors ${
                  selectedPermission === 'edit' 
                    ? 'border-blue-500 bg-blue-50 text-blue-700' 
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Users className="h-4 w-4" />
                  <span className="font-medium">Can Edit</span>
                </div>
                <p className="text-xs text-gray-500">Can view and modify data</p>
              </button>
            </div>
          </div>

          {/* Share Link */}
          <div className="space-y-2">
            <Label htmlFor="share-link" className="text-sm font-medium">Share Link</Label>
            <div className="flex gap-2">
              <Input
                id="share-link"
                value={shareUrl}
                readOnly
                className="flex-1"
              />
              <Button
                onClick={handleCopyLink}
                variant="outline"
                size="icon"
                className="shrink-0"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            {copied && (
              <p className="text-sm text-green-600">Link copied to clipboard!</p>
            )}
          </div>

          {/* Share Options */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Share Via</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                onClick={handleEmailShare}
                className="justify-start gap-2"
              >
                <Mail className="h-4 w-4" />
                Email
              </Button>
              <Button
                variant="outline"
                onClick={() => handleSocialShare('whatsapp')}
                className="justify-start gap-2"
              >
                <MessageSquare className="h-4 w-4" />
                WhatsApp
              </Button>
              <Button
                variant="outline"
                onClick={() => handleSocialShare('twitter')}
                className="justify-start gap-2"
              >
                <Share2 className="h-4 w-4" />
                Twitter
              </Button>
              <Button
                variant="outline"
                onClick={() => handleSocialShare('linkedin')}
                className="justify-start gap-2"
              >
                <Share2 className="h-4 w-4" />
                LinkedIn
              </Button>
            </div>
          </div>

          {/* Export Option */}
          <div className="pt-4 border-t">
            <Button
              onClick={handleExport}
              variant="outline"
              className="w-full justify-center gap-2"
            >
              <Download className="h-4 w-4" />
              Export Data (JSON)
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
