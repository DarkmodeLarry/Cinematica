import { getSession } from '@/lib/session'
import SiteHeader from '@/components/layouts/site-header'

interface AccountLayoutProps {
  children: React.ReactNode
}

export default async function AccountLayout({ children }: AccountLayoutProps) {
  const session = await getSession()

  return (
    <div className='flex flex-col min-h-screen'>
      <SiteHeader session={session} />
      <main className='flex-1'>{children}</main>
    </div>
  )
}
