import { getSession } from '@/lib/session'
import SiteHeader from '@/components/layouts/site-header'
import Image from 'next/image'
import marvel from '@/assets/marvel-group.jpg'

interface AuthLayoutProps {
  children: React.ReactNode
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
  const session = await getSession()

  return (
    <div className='flex flex-col items-center justify-center w-full min-h-screen bg-opacity-70 bg-cyan-700'>
      <Image src={marvel} placeholder='blur' alt='background' fill className='fixed -z-10 mix-blend-overlay' />
      <SiteHeader session={session} />
      <main className='flex-1'>{children}</main>
    </div>
  )
}
