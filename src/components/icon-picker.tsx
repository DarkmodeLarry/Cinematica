import * as React from 'react'
import Image from 'next/image'
import type { PickedIcon, SetState } from '@/types'
import { motion } from 'framer-motion'

import { api } from '@/lib/api/api'
import { cn } from '@/lib/utils'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

interface IconPickerProps {
  setIconPicker: SetState<boolean>
  icon: PickedIcon
  setIcon: SetState<PickedIcon>
}

const IconPicker = ({ setIconPicker, icon, setIcon }: IconPickerProps) => {
  const [isScrolled, setIsScrolled] = React.useState(false)

  // change background color on scroll
  React.useEffect(() => {
    const changeBgColor = () => {
      window.scrollY > 0 ? setIsScrolled(true) : setIsScrolled(false)
    }
    window.addEventListener('scroll', changeBgColor)
    return () => window.removeEventListener('scroll', changeBgColor)
  }, [isScrolled])

  //  user query
  const userQuery = api.user.getCurrent.useQuery()

  // icons query
  const iconsQuery = api.icon.getAllUnused.useQuery(icon.id, {
    enabled: !!icon.id
  })

  return (
    <motion.div
      className='flex flex-col w-full gap-6'
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className={cn(
          'sticky top-0 z-40 w-full pb-5 pt-20',
          isScrolled
            ? 'bg-white shadow-md backdrop-blur-sm dark:bg-neutral-900/80'
            : 'bg-transparent'
        )}
      >
        <div className='container flex flex-wrap items-center justify-between w-full gap-4 max-w-screen-2xl'>
          <div className='flex items-center gap-3.5'>
            <Button
              aria-label='Go back'
              variant='ghost'
              className='h-auto p-0 rounded hover:bg-transparent dark:hover:bg-transparent'
              onClick={() => setIconPicker(false)}
            >
              <Icons.arrowLeft className='w-10 h-10' aria-hidden='true' />
            </Button>
            <div>
              <h1 className='text-2xl font-medium sm:text-3xl'>Edit Profile</h1>
              <h2 className='text-xl font-medium sm:text-2xl'>Choose a profile icon.</h2>
            </div>
          </div>
          {userQuery.data && (
            // eslint-disable-next-line tailwindcss/classnames-order
            <div className='flex flex-col-reverse items-center gap-1 xs:flex-row xs:gap-4'>
              <div className='text-xl font-medium sm:text-2xl'>{userQuery.data.name}</div>
              <div className='relative h-16 overflow-hidden rounded shadow-sm aspect-square w-fit group-hover:ring-4 sm:h-20'>
                {icon ? (
                  <Image
                    src={icon.href}
                    alt={icon.title}
                    fill
                    sizes='(max-width: 768px) 100vw, 
                      (max-width: 1200px) 50vw, 33vw'
                    className='object-cover'
                  />
                ) : (
                  <Skeleton className='w-full h-full bg-neutral-700' />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className='container flex w-full max-w-screen-2xl flex-col gap-2.5'>
        <div className='text-xl font-medium sm:text-2xl'>The Classics</div>
        {iconsQuery.isError ? (
          <div className='space-y-2.5'>
            <div className='text-xl font-medium text-red-500 sm:text-2xl'>
              Failed to load profiles
            </div>
            <Button aria-label='Retry' variant='flat' onClick={() => void iconsQuery.refetch()}>
              <Icons.refresh className='w-4 h-4 mr-2' aria-hidden='true' />
              Retry
            </Button>
          </div>
        ) : (
          <div className='flex items-center gap-2.5 overflow-x-auto py-1.5 sm:gap-5'>
            {iconsQuery.isLoading
              ? Array.from({ length: 4 }, (_, i) => (
                  <Skeleton key={i} className='h-32 rounded aspect-square bg-neutral-700' />
                ))
              : iconsQuery.data?.map((icon) => (
                  <Button
                    key={icon.id}
                    aria-label='Choose profile icon'
                    className='relative aspect-square h-auto w-32 min-w-[80px] overflow-hidden rounded p-0 hover:opacity-80 active:scale-90'
                    onClick={() => {
                      setIcon(icon)
                      setIconPicker(false)
                    }}
                  >
                    {icon ? (
                      <Image src={icon.href} alt={icon.title} fill className='object-cover' />
                    ) : (
                      <Skeleton className='w-full h-full bg-neutral-700' />
                    )}
                  </Button>
                ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default IconPicker
