import type { Metadata } from 'next'
import { Inter, Noto_Sans, Modak, DynaPuff } from 'next/font/google'
import Header from '@/components/layout/Header'
import './globals.css'

// Initialize DynaPuff font
const dynaPuff = DynaPuff({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dynapuff',
})

// Keep your other font initializations
const modak = Modak({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-modak',
})

const notoSans = Noto_Sans({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-noto-sans',
})

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${notoSans.variable} ${modak.variable} ${dynaPuff.variable} ${inter.variable} font-sans`}>
        <Header />
        <main className="pt-16">
          {children}
        </main>
      </body>
    </html>
  )
}