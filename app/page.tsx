"use client";

import Dashboard from '@/components/Dashboard'
import { useEffect, useState } from 'react';

export default function Home() {
    const [isLoaded, setIsLoaded] = useState(false);

    // Mark as loaded after initial render to prevent hydration mismatch
  useEffect(() => {
    setIsLoaded(true);
  }, []);
      // Show loading state until component is hydrated
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-100 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  return <Dashboard />
}
