import type { Metadata } from 'next'
import { Work_Sans, Cormorant_Garamond } from 'next/font/google'
import './globals.css'

const workSans = Work_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['300', '400', '500', '600', '700'],
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Feelings Unplugged',
  description: 'A Gen Alpha/Z-optimized mental health journaling experience',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="feelingsunplugged">
      <body className={`${workSans.variable} ${cormorant.variable} antialiased bg-base-100 text-base-content`}>{children}</body>
    </html>
  )
}
// Deployment verified: Sun Nov  9 16:33:28 EST 2025
