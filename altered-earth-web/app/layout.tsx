import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ALTERED.EARTH Journizine Vol. 1',
  description: 'A journal + magazine for teens who feel everything. Free digital version with interactive prompts, playlist builders, and mental health resources.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
