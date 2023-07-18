'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useModalStore } from '@/stores/modal'
import { useSearchStore } from '@/stores/search'
import { Rating } from '@mui/material'
import StarRoundedIcon from '@mui/icons-material/StarRounded'

import type { Show } from '@/types'
import type { SessionUser } from '@/types'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import TrendingMoviesComponent from './TrendingMoviesComponent'
import { title } from 'process'
import TextTruncate from 'react-text-truncate'
import { Separator } from './ui/separator'

interface HeroProps {
  user?: SessionUser
  shows: Show[]
}

const Hero = ({ shows }: HeroProps) => {
  // randomize show on page render
  const [playing, setPlaying] = useState(false)
  const [truncLine, setTruncLine] = useState(2)
  const [randomShow, setRandomShow] = useState<Show | null>(null)

  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * shows.length)

    setRandomShow(shows[randomNumber] ?? null)
  }, [shows])
  console.log(randomShow)

  // stores
  const modalStore = useModalStore()
  const searchStore = useSearchStore()

  if (searchStore.query.length > 0) {
    return null
  }

  const readMore = (e) => {
    setTruncLine(0)
    e.preventDefault()
    e.target.style.display = 'none'
  }

  const getReleaseYear = (date: string) => {
    let year = new Date(date)
    return year.getFullYear()
  }

  const getCertification = (randomShow: Show) => {
    if (randomShow.adult) {
      return 'R'
    } else if (randomShow.certification) {
      return randomShow.certification
    }
  }

  return (
    <>
      <section
        aria-label='Hero'
        className='lg:h-[60rem] md:h-[55rem] flex items-center px-12 relative bg-gradient-to-t from-blue-600 via-blue-300 to-[#2776C6]'
      >
        {randomShow && (
          <>
            <div className='hero__overlay pointer-events-none absolute top-0 -right-5 w-4/6 h-full bg-blend-overlay'>
              <Image
                src={`https://image.tmdb.org/t/p/w1280/${
                  randomShow?.poster_path ?? randomShow?.backdrop_path ?? ''
                }`}
                alt={randomShow?.title ?? 'poster'}
                className='bg-right-top bg-cover'
                priority
                fill
              />
            </div>
            <div className='lg:max-w-2xl md:max-w-xl'>
              <p className='lg:text-xl text-rose-950 font-bold font-dyna'>
                Today&apos;s Featured Film
              </p>
              <h2 className='pt-2 text-5xl font-extrabold z-50'>
                {randomShow.title || randomShow.original_title || randomShow.name}
                <span className='hero__featuredYear ml-2'>
                  ({getReleaseYear(randomShow.release_date || randomShow.first_air_date)})
                </span>
              </h2>

              <div className='flex items-center mt-3 space-x-2 text-xs font-semibold md:text-sm'>
                <p className=' overflow-hidden text-sm font-medium uppercase whitespace-nowrap text-ellipsis'>
                  <span className='px-2 py-1 m-0 mt-4 mr-2 -ml-1 border rounded-md bg-white/5'>
                    {randomShow.certification}PG-13
                  </span>
                  <Separator className='text-black' />
                  {randomShow?.genres?.slice(0, 3).map((genre) => (
                    <span className='m-0 mt-4 text-xs font-medium uppercase'>
                      {genre.name}Goofy Genre
                    </span>
                  ))}
                </p>
                <p className='text-green-600'>{randomShow?.vote_average * 10 ?? '-'}% Match</p>
                <p className='text-gray-300'>{randomShow?.release_date ?? '-'}</p>
              </div>
              <TextTruncate
                line={truncLine}
                element='p'
                containerClassName='w-3/4 my-2 textTruncate text-lg'
                textTruncateChild={
                  <a href='#' onClick={readMore}>
                    <small>[more]</small>
                  </a>
                }
                truncateText='…'
                text={randomShow.overview}
              />
              {randomShow.number_of_seasons && (
                <p className='hero__seriesSeasons'>
                  {randomShow.number_of_seasons} Seasons, {randomShow.number_of_episodes} Episodes
                </p>
              )}
              <div className='flex items-center mb-4 mt-3'>
                <Rating
                  name='movie-rating'
                  value={randomShow.vote_average / 2}
                  precision={0.5}
                  icon={<StarRoundedIcon className='text-yellow-300' />}
                />
                <p className='mt-0 mb-2 ml-2 mr-0 hero__featuredLikes'>
                  {/* {numeral(randomShow.vote_average / 2).format('0.0')}
                <small> ({numeral(randomShow.vote_count).format('0,0')})</small> */}
                </p>
              </div>

              <Button
                className='rounded-full mt-4 text-rose-950 p-8 uppercase font-semibold tracking-wider text-lg font-mulish bg-white hover:bg-white/50'
                variant='default'
                onClick={() => setPlaying(true)}
              >
                <Icons.play
                  className='w-6 h-6 mr-2 text-rose-950 fill-current'
                  aria-hidden='true'
                />
                Play Trailer
              </Button>
            </div>
          </>
        )}
      </section>

      <TrendingMoviesComponent />
    </>
  )
}

export default Hero
