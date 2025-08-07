"use client"

import { useState, useRef, useEffect } from 'react'
import { Search, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Image from 'next/image'

interface HeaderProps {
  onMenuClick: () => void
  searchQuery: string
  onSearchChange: (query: string) => void
}

export default function Header({ onMenuClick, searchQuery, onSearchChange }: HeaderProps) {
  const [searchExpanded, setSearchExpanded] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)

  const handleSearchClick = () => {
    setSearchExpanded(true)
  }

  const handleSearchClose = () => {
    setSearchExpanded(false)
    onSearchChange('')
  }

  const handleSearchBlur = () => {
    // Only close if there's no search query
    if (!searchQuery.trim()) {
      setSearchExpanded(false)
    }
  }

  // Focus input when expanded
  useEffect(() => {
    if (searchExpanded && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [searchExpanded])

  return (
    <header className="bg-[#FCFDFD] px-4 py-3 lg:px-6 h-16 flex items-center">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="hidden sm:flex items-center gap-2">
            {/* <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">FT</span>
            </div>
            <span className="font-semibold text-lg hidden sm:block">FinTrack</span> */}
          <Image src="/logo.png" alt='logo' width={112} height={32} />
          </div>
        </div>

        <div className="flex items-center gap-4"> 
          {/* Universal Search - Same behavior for desktop and mobile */}
          <div className="flex items-center border-none">
            {!searchExpanded ? (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleSearchClick}
                className="hover:bg-gray-100"
              >
                <Search className="h-5 w-5" />
              </Button>
            ) : (
              <div className="relative flex items-center">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  ref={searchInputRef}
                  placeholder="Search transactions..."
                  className="pl-10 pr-10 w-48 md:w-64 outline-none border-b border-primary p-2"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  onBlur={handleSearchBlur}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') {
                      handleSearchClose()
                    }
                  }}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 h-6 w-6"
                  onClick={handleSearchClose}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          <Button className='hidden sm:block' variant="ghost" size="icon">
            {/* <MoreHorizontal className="h-5 w-5" /> */}
            <Image src={"/app-grid.svg"} alt='app grid' width={20} height={20} />
          </Button>
          <Avatar>
            <AvatarImage src="/placeholderimage.png" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}
