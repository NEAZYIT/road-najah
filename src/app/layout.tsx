import type { Metadata } from 'next'
import { Inter, Noto_Sans, Modak, DynaPuff, VT323, Pixelify_Sans } from 'next/font/google'
import Header from '@/components/layout/Header'
import './globals.css'


export const metadata: Metadata = {
  title: 'Road a Najah | Empower Your Education',
  description: 'Empowering young people and students to achieve their goals',
  icons: {
    icon: 'road.ico',
    apple: 'road.ico'
  }
}

// Add these new font configurations
const vt323 = VT323({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-vt323',
})

const pixelifySans = Pixelify_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-pixelify',
})

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
      <body className={`${notoSans.variable} ${modak.variable} ${dynaPuff.variable} ${inter.variable} ${vt323.variable} ${pixelifySans.variable} font-sans`}>
        <Header />
        <main className="pt-16">
          {children}
        </main>
      </body>
    </html>
  )
}