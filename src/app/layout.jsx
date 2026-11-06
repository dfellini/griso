import { Analytics } from '@vercel/analytics/next'

import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'
import { SITE_URL } from '@/lib/site'

import '@/styles/tailwind.css'

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: '%s - BugMoto',
    default:
      'BugMoto - Motorcycles and adventures.',
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
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="flex h-full bg-zinc-50 dark:bg-black">
        <Providers>
          <div className="flex w-full">
            <Layout>{children}</Layout>
          </div>
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
