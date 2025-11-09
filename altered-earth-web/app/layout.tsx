import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
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
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  )
}
