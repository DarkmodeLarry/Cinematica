'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useModalStore } from '@/stores/modal'
import { useSearchStore } from '@/stores/search'
import type { Show } from '@/types'

import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Grow } from '@mui/material'
import ModalVideo from 'react-modal-video'

interface HeroProps {
  shows: Show[]
}

const Hero = ({ shows }: HeroProps) => {
  // randomize show on page render
  const [playing, setPlaying] = useState(false)
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

  return (
    <section aria-label='Hero' className='w-full'>
      {randomShow && (
        <div className='container w-full max-w-screen-2xl'>
          <div className='inset-0 w-full h-screen -z-10'>
            <div className='absolute top-0 right-0 w-[75%] h-[40rem] mix-blend-overlay pointer-events-none z-10 app__overlay'>
              <Image
                src={`https://image.tmdb.org/t/p/original/${
                  randomShow?.poster_path ?? randomShow?.backdrop_path ?? ''
                }`}
                alt={randomShow?.title ?? 'poster'}
                className='bg-right-top bg-cover w-[75%]'
                fill
                priority
              />
            </div>
            <div className='grid max-w-lg pt-24 space-y-2 '>
              <p className='text-xl font-light uppercase'>today&apos;s featured film</p>
              <h1 className='text-4xl font-bold tracking-tighter md:text-4xl'>
                {randomShow?.title ?? randomShow?.name}
              </h1>
              <div className='flex space-x-2 text-xs font-semibold md:text-sm'>
                <p className='text-green-600'>{randomShow?.vote_average * 10 ?? '-'}% Match</p>
                <p className='text-gray-300'>{randomShow?.release_date ?? '-'}</p>
              </div>
              <p className='text-sm text-gray-300 line-clamp-4 md:text-base'>
                {randomShow?.overview ?? '-'}
              </p>
              <div className='flex items-center space-x-8 pt-1.5'>
                <Button
                  aria-label='Play video'
                  className='h-auto gap-1.5 rounded-full bg-[#f5f5f5] text-cyan-800 uppercase'
                  onClick={() => {
                    modalStore.setShow(randomShow)
                    modalStore.setOpen(true)
                    modalStore.setPlay(true)
                  }}
                >
                  <Icons.play className='w-3 h-3 fill-current text-cyan-800' aria-hidden='true' />
                  Play Trailer
                </Button>
                <Button
                  aria-label="Open show's details modal"
                  // variant='outline'
                  className='h-auto gap-2 rounded hover:bg-transparent hover:outline-double'
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
        </div>
      )}
    </section>
  )
}

export default Hero
