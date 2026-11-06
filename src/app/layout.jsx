import { Anton, Barlow, Barlow_Condensed } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'

import { Layout } from '@/components/Layout'
import { SITE_URL } from '@/lib/site'

import '@/styles/tailwind.css'

const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-anton',
  display: 'swap',
})

const barlow = Barlow({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-barlow',
  display: 'swap',
})

const barlowCondensed = Barlow_Condensed({
  weight: ['500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-barlow-condensed',
  display: 'swap',
})

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: '%s - BugMoto',
    default: 'BugMoto - Motorcycles and adventures.',
  },
  description:
    'Whether you’re a seasoned rider, a returning motorcyclist, or just someone who loves the open road, this is a space for inspiring stories, insightful videos, and a few laughs along the way.',
  openGraph: {
    siteName: 'BugMoto',
    type: 'website',
    locale: 'en_US',
  },
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`h-full ${anton.variable} ${barlow.variable} ${barlowCondensed.variable}`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <Layout>{children}</Layout>
        <Analytics />
      </body>
    </html>
  )
}
