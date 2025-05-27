import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Zynvo',
  description: 'Welcome to Zynvo - Your Next Generation Platform',
  generator: 'v0.dev',
  icons: {
    icon: [
      { url: '/favicon-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48.png', sizes: '48x48', type: 'image/png' },
    ],
    shortcut: '/favicon-32.png',
    apple: '/favicon-48.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
