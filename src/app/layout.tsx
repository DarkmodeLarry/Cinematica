// import { Work_Sans } from 'next/font/google'
import { Mulish } from 'next/font/google'
import TRPCProvider from '@/context/trpc-provider'
import { siteConfig } from '@/config/site'
import { absoluteUrl, cn } from '@/lib/utils'
import TailwindIndicator from '@/components/tailwind-indicator'
import '@/styles/globals.css'

const mulish = Mulish({
  subsets: ['latin']
})

// const work = Work_Sans({
//   subsets: ['latin']
// })

interface RootLayoutProps {
  children: React.ReactNode
}

export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  keywords: [
    'Next.js',
    'Tailwind CSS',
    'TypeScript',
    'React',
    'TRPC',
    'Shadcn',
    'Prisma',
    'Railway'
  ],
  authors: [
    {
      name: 'shogunOfSabi',
      url: 'https://github.com/shogunOfSabi'
    }
  ],
  creator: 'shogunOfSabi',
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: 'white' },
    { media: '(prefers-color-scheme: light)', color: 'black' }
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: absoluteUrl('/src/pages/api/og.tsx'),
        width: 1200,
        height: 630,
        alt: siteConfig.name
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/api/og.tsx`],
    creator: '@shogunOfSabi'
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico'
  }
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <TRPCProvider>
      <html
        lang='en'
        className={cn('scroll-smooth bg-neutral-900 font-sans text-slate-50 antialiased')}
      >
        <head />
        <body className='min-h-screen'>
          {children}
          <TailwindIndicator />
        </body>
      </html>
    </TRPCProvider>
  )
}
