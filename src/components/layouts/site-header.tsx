'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useMounted } from '@/hooks/use-mounted'
import { useProfileStore } from '@/stores/profile'
import { useSearchStore } from '@/stores/search'
import type { Session } from 'next-auth'
import { signOut } from 'next-auth/react'
import { toast } from 'react-hot-toast'

import { siteConfig } from '@/config/site'
import { api } from '@/lib/api/api'
import { searchShows } from '@/lib/fetchers'
import { cn } from '@/lib/utils'
import { DebouncedInput } from '@/components/debounced-input'
import { Icons } from '@/components/icons'
import { MainNav } from '@/components/layouts/main-nav'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Skeleton } from '@/components/ui/skeleton'
import { Work_Sans } from 'next/font/google'

interface SiteHeaderProps {
  session: Session | null
}

const SiteHeader = ({ session }: SiteHeaderProps) => {
  const router = useRouter()
  const path = usePathname()
  const mounted = useMounted()
  const [isScrolled, setIsScrolled] = React.useState(false)

  // change background color on scroll
  React.useEffect(() => {
    const changeBgColor = () => {
      window.scrollY > 0 ? setIsScrolled(true) : setIsScrolled(false)
    }
    window.addEventListener('scroll', changeBgColor)
    return () => window.removeEventListener('scroll', changeBgColor)
  }, [isScrolled])

  async function searchShowsByQuery(value: string) {
    searchStore.setQuery(value)
    const shows = await searchShows(value)
    void searchStore.setShows(shows.results)
  }

  // stores
  const searchStore = useSearchStore()
  const profileStore = useProfileStore()

  // other profiles query
  const otherProfilesQuery = profileStore.profile
    ? api.profile.getOthers.useQuery(profileStore.profile.id, {
        enabled: !!session?.user && !!profileStore.profile
      })
    : null

  return (
    <header
      aria-label='Header'
      className={cn(
        'sticky top-0 z-40 w-full',
        isScrolled ? 'bg-neutral-900 shadow-md' : 'bg-transparent'
      )}
    >
      <nav className='container flex items-center justify-between h-16 space-x-4 max-w-screen-2xl sm:space-x-0'>
        <MainNav items={siteConfig.mainNav} />
        <div className='flex items-center space-x-1.5'>
          {mounted ? (
            <DebouncedInput
              containerClassName={cn(
                path === '/login' || path === '/login/plans' ? 'hidden' : 'flex'
              )}
              setQuery={searchStore.setQuery}
              setData={searchStore.setShows}
              value={searchStore.query}
              onChange={(value) => void searchShowsByQuery(value.toString())}
            />
          ) : (
            <Skeleton className='aspect-square h-7 bg-neutral-700' />
          )}
          {mounted ? (
            <Button
              aria-label='Notifications'
              variant='ghost'
              className='hidden h-auto p-1 rounded-full hover:bg-transparent dark:hover:bg-transparent lg:flex'
              onClick={() =>
                toast.success('Do a kickflip', {
                  icon: '🛹'
                })
              }
            >
              <Icons.bell
                className='w-5 h-5 text-white transition-opacity cursor-pointer hover:opacity-75 active:scale-95'
                aria-hidden='true'
              />
            </Button>
          ) : (
            <Skeleton className='aspect-square h-7 bg-neutral-700' />
          )}
          {mounted ? (
            session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    aria-label='Account menu trigger'
                    variant='ghost'
                    className='h-auto shrink-0 px-2 py-1.5 text-base hover:bg-transparent focus:ring-0 hover:dark:bg-neutral-800 [&[data-state=open]>svg]:rotate-180'
                  >
                    {profileStore.profile?.icon ? (
                      <Image
                        src={profileStore.profile.icon.href}
                        alt={profileStore.profile.icon.title}
                        width={28}
                        height={28}
                        className='object-cover transition-opacity rounded-sm hover:opacity-80'
                        loading='lazy'
                      />
                    ) : (
                      <Skeleton className='rounded-sm aspect-square h-7 bg-neutral-600' />
                    )}
                    <Icons.chevronDown className='hidden w-4 h-4 ml-2 transition-transform duration-200 lg:inline-block' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align='end'
                  sideOffset={20}
                  className='overflow-x-hidden overflow-y-auto rounded-sm w-52 bg-neutral-800/90 text-slate-200 dark:bg-neutral-800/90 dark:text-slate-200'
                >
                  {otherProfilesQuery?.data?.map((profile) => (
                    <DropdownMenuItem
                      key={profile.id}
                      asChild
                      className='hover:bg-neutral-700 focus:bg-neutral-700 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700'
                    >
                      <Button
                        aria-label={profile.name}
                        variant='ghost'
                        className='justify-between w-full h-auto px-2 space-x-2 hover:bg-transparent focus:ring-0 focus:ring-offset-0 active:scale-100 dark:hover:bg-transparent'
                        onClick={() => {
                          router.push('/')
                          useProfileStore.setState({
                            profile,
                            pinForm: profile.pin ? true : false
                          })
                        }}
                      >
                        <div className='flex items-center gap-2'>
                          {profile.icon ? (
                            <Image
                              src={profile.icon.href}
                              alt={profile.icon.title}
                              width={28}
                              height={28}
                              className='object-cover rounded'
                              loading='lazy'
                            />
                          ) : (
                            <Skeleton className='aspect-square h-7 bg-neutral-700' />
                          )}
                          <p>{profile.name}</p>
                        </div>
                        {profile.pin && (
                          <Icons.lock
                            className='h-3.5 w-3.5 text-slate-400'
                            aria-label='Private profile'
                          />
                        )}
                      </Button>
                    </DropdownMenuItem>
                  ))}
                  {siteConfig.profileDropdownItems.map(
                    (item, index) =>
                      item.title !== 'Sign Out of Netflix' &&
                      (item.href ? (
                        <DropdownMenuItem
                          key={index}
                          asChild
                          className='hover:bg-neutral-700 focus:bg-neutral-700 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700'
                        >
                          <Link href={item.href}>
                            {item.icon && (
                              <item.icon
                                className='w-4 h-4 mr-3 text-slate-400'
                                aria-hidden='true'
                              />
                            )}
                            <span className='line-clamp-1'>{item.title}</span>
                          </Link>
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem
                          key={index}
                          asChild
                          className='hover:bg-neutral-700 focus:bg-neutral-700 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700'
                        >
                          <span onClick={item.onClick}>
                            {item.icon && (
                              <item.icon
                                className='w-4 h-4 mr-3 text-slate-400'
                                aria-hidden='true'
                              />
                            )}
                            <span className='line-clamp-1'>{item.title}</span>
                          </span>
                        </DropdownMenuItem>
                      ))
                  )}
                  <DropdownMenuSeparator />
                  {siteConfig.profileDropdownItems.map(
                    (item, index) =>
                      item.title === 'Sign Out of Netflix' && (
                        <DropdownMenuItem
                          key={index}
                          asChild
                          className='hover:bg-neutral-700 focus:bg-neutral-700 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700'
                        >
                          <span
                            className='grid line-clamp-1 place-items-center'
                            onClick={() => void signOut()}
                          >
                            {item.title}
                          </span>
                        </DropdownMenuItem>
                      )
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                aria-label='Sign in'
                href='/login'
                className={cn(
                  buttonVariants({
                    variant: 'brand',
                    size: 'auto',
                    className: 'h-auto rounded'
                  })
                )}
              >
                Sign In
              </Link>
            )
          ) : (
            <Skeleton className='w-10 h-7 bg-neutral-700' />
          )}
        </div>
      </nav>
    </header>
  )
}

export default SiteHeader
