import SiteHeader from '@/components/layouts/site-header'

interface AccountLayoutProps {
  children: React.ReactNode
}

export default async function AccountLayout({ children }: AccountLayoutProps) {
  return (
    <div className='flex flex-col min-h-screen'>
      <SiteHeader />
      <main className='flex-1'>{children}</main>
    </div>
  )
}
