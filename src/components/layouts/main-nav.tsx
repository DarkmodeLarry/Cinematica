import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSearchStore } from '@/stores/search'
import type { NavItem } from '@/types'

import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

interface MainNavProps {
  items?: NavItem[]
}

export function MainNav({ items }: MainNavProps) {
  const path = usePathname()

  // search store
  const searchStore = useSearchStore()

  return (
    <div className='flex gap-6 lg:gap-10 items-center justify-center'>
      <Link
        href='/'
        className='hidden md:block'
        onClick={() => {
          searchStore.setQuery('')
          searchStore.setShows([])
        }}
      >
        <h2 className='w-28 h-auto object-cover hover:opacity-100 font-mulish text-xl hover:scale-105 hover:duration-100 ease-in-out'>
          Cinematica
        </h2>
      </Link>
      {items?.length ? (
        <nav className='hidden gap-6 md:flex'>
          {items?.map(
            (item, index) =>
              item.href && (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    'flex items-center text-lg font-semibold text-slate-900  dark:text-slate-900 sm:text-sm hover:scale-95 transition-all duration-150',
                    path === item.href && 'font-bold dark:text-black',
                    item.disabled && 'cursor-not-allowed '
                  )}
                  onClick={() => searchStore.setQuery('')}
                >
                  {item.title}
                </Link>
              )
          )}
        </nav>
      ) : null}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            className='h-auto px-2 py-1.5 text-base hover:bg-neutral-800 focus:ring-0 dark:hover:bg-neutral-800 md:hidden'
          >
            <span className='font-bold'>Menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align='start'
          sideOffset={20}
          className='overflow-x-hidden overflow-y-auto rounded-sm w-52 bg-neutral-700 text-slate-200 dark:bg-neutral-800 dark:text-slate-200'
        >
          <DropdownMenuLabel>
            <Link
              href='/'
              className='flex items-center'
              onClick={() => {
                searchStore.setQuery('')
                searchStore.setShows([])
              }}
            >
              <span className='text-gray-100' aria-hidden='true'>
                {siteConfig.name}
              </span>
            </Link>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {items?.map((item, index) =>
            item.href ? (
              <DropdownMenuItem
                key={index}
                asChild
                className='hover:bg-neutral-700 focus:bg-neutral-700 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700'
              >
                <Link
                  href={item.href}
                  onClick={() => {
                    searchStore.setQuery('')
                    searchStore.setShows([])
                  }}
                >
                  {item.icon && (
                    <item.icon className='w-4 h-4 mr-2 bg-transparent' aria-hidden='true' />
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
                <div onClick={item.onClick}>
                  {item.icon && <item.icon className='w-4 h-4 mr-2' aria-hidden='true' />}
                  <span className='line-clamp-1'>{item.title}</span>
                </div>
              </DropdownMenuItem>
            )
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
