import ProfileScreen from '@/components/screens/profile-screen'
import { getSession } from '@/lib/session'
import SiteHeader from '@/components/layouts/site-header'
import SiteFooter from '@/components/layouts/site-footer'
import '@/styles/globals.css'

interface ShowsLayoutProps {
  children: React.ReactNode
}

export default async function ShowsLayout({ children }: ShowsLayoutProps) {
  const session = await getSession()
  //TODO: look for a way to use zustand profile state here

  return (
    <div className='relative w-full my-0 mx-auto app'>
      <SiteHeader session={session} />
      <main className='flex-1'>{children}</main>
      <SiteFooter />
    </div>
  )
}
