import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'FinTrack - Financial Dashboard',
  description: 'Modern financial tracking and wallet management dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'Public Sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
        {children}
      </body>
    </html>
  )
}
