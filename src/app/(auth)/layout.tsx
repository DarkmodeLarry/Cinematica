import SiteHeader from '@/components/layouts/site-header'

interface AuthLayoutProps {
  children: React.ReactNode
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className='flex flex-col min-h-screen'>
      <SiteHeader />
      <main className='flex-1'>{children}</main>
    </div>
  )
}
