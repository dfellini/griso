import { Anton, Barlow, Barlow_Condensed } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'

import { Layout } from '@/components/Layout'
import { JsonLd } from '@/components/JsonLd'
import { SITE_URL } from '@/lib/site'
import { organization, person, website } from '@/lib/structuredData'

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
    default: 'BugMoto: Motorcycle Reviews, Rides & Stories for Older Riders',
  },
  description:
    'Motorcycle reviews, ride stories and how-tos from Bug, a Portland rider who got back on two wheels later in life. For seasoned, returning and older riders.',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-video-preview': -1,
      'max-snippet': -1,
    },
  },
  openGraph: {
    siteName: 'BugMoto',
    type: 'website',
    locale: 'en_US',
  },
}

export const viewport = {
  themeColor: '#0b0b0b',
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`h-full ${anton.variable} ${barlow.variable} ${barlowCondensed.variable}`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <JsonLd data={{ '@graph': [website, organization, person] }} />
        <Layout>{children}</Layout>
        <Analytics />
      </body>
    </html>
  )
}
