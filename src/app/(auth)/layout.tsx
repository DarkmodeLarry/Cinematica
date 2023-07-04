import { getSession } from '@/lib/session'
import SiteHeader from '@/components/layouts/site-header'
import SiteFooter from '@/components/layouts/site-footer'
import '@/styles/LoginPage.css'
interface AuthLayoutProps {
  children: React.ReactNode
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
  const session = await getSession()

  return (
    <div className='flex min-h-screen flex-col'>
      <SiteHeader session={session} />
      <main className='flex-1'>{children}</main>
      <SiteFooter />
    </div>
  )
}
