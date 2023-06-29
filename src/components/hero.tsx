'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useModalStore } from '@/stores/modal'
import { useSearchStore } from '@/stores/search'
import type { Show } from '@/types'

import { cn } from '@/lib/utils'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'

interface HeroProps {
  shows: Show[]
}

const Hero = ({ shows }: HeroProps) => {
  // randomize show on page render
  const [randomShow, setRandomShow] = useState<Show | null>(null)
  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * shows.length)
    setRandomShow(shows[randomNumber] ?? null)
  }, [shows])

  // stores
  const modalStore = useModalStore()
  const searchStore = useSearchStore()

  if (searchStore.query.length > 0) {
    return null
  }

  const overlayStyle = {
    backgroundImage: `url(${imageLargeBase}${
      featuredMovie.backdrop_path || featuredMovie.poster_path
    })`,
    backgroundSize: 'cover',
    backgroundPosition: 'top right'
  }

  return (
    <section aria-label='Hero' className='w-full'>
      {randomShow && (
        <div className='container w-full max-w-screen-2xl'>
          <div className='absolute inset-0 w-full h-screen -z-10'>
            <div
              className={cn(
                'bg-black/60 bg-gradient-to-b from-neutral-900/10 to-neutral-900',
                'absolute inset-0 z-10 h-full w-full'
              )}
            />
            <Image
              src={`https://image.tmdb.org/t/p/original/${
                randomShow?.poster_path ?? randomShow?.backdrop_path ?? ''
              }`}
              alt={randomShow?.title ?? 'poster'}
              className='object-cover w-full h-auto'
              fill
              priority
            />
          </div>
          <div className='grid max-w-lg pt-24 space-y-2 '>
            <h1 className='text-3xl font-bold md:text-4xl'>
              {randomShow?.title ?? randomShow?.name}
            </h1>
            <div className='flex space-x-2 text-xs font-semibold md:text-sm'>
              <p className='text-green-600'>{randomShow?.vote_average * 10 ?? '-'}% Match</p>
              <p className='text-gray-300'>{randomShow?.release_date ?? '-'}</p>
            </div>
            <p className='text-sm text-gray-300 line-clamp-4 md:text-base'>
              {randomShow?.overview ?? '-'}
            </p>
            <div className='flex items-center space-x-2 pt-1.5'>
              <Button
                aria-label='Play video'
                className='h-auto gap-1.5 rounded'
                onClick={() => {
                  modalStore.setShow(randomShow)
                  modalStore.setOpen(true)
                  modalStore.setPlay(true)
                }}
              >
                <Icons.play className='w-5 h-5 fill-current' aria-hidden='true' />
                Play
              </Button>
              <Button
                aria-label="Open show's details modal"
                variant='outline'
                className='h-auto gap-2 rounded'
                onClick={() => {
                  modalStore.setShow(randomShow)
                  modalStore.setOpen(true)
                  modalStore.setPlay(false)
                }}
              >
                <Icons.info className='w-5 h-5' aria-hidden='true' />
                More Info
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Hero
