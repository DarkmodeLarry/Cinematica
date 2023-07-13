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


  return (
    <>
      <section aria-label='Hero' className='pt-28 pr-6 pb-16 pl-6
       md:pt-28 md:pr-12 md:pb-12 md:w-screen bg-gradient-to-t from-[#2776C6] to-[#A4DBFF]'>
        {randomShow && (
          <>
            <div className='hero__overlay pointer-events-none absolute top-0 right-0 w-3/4 h-[32rem] bg-blend-overlay z-50 md:w-[80%] md:h-[38rem] md:[40rem] lg:[45rem] md:left-[25%] md:top-[0%]'>
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
            <div className="max-w-3xl">
            <p className='text-sm font-bold font-mulish'>Today&apos;s Featured Film</p>
            <h2 className='my-2 text-2xl font-semibold'>
              {randomShow.title || randomShow.original_title || randomShow.name}
              <span className='hero__featuredYear'>
                ({getReleaseYear(randomShow.release_date || randomShow.first_air_date)})
              </span>
            </h2>
            <p className='p-1 overflow-hidden text-sm font-medium uppercase whitespace-nowrap text-ellipsis'>
              <span className='px-2 py-1 m-0 mt-4 mr-2 -ml-1 border rounded-md bg-white/5'>{randomShow.certification}PG-13</span>
              {randomShow?.genres?.slice(0, 3).map((genre) => (
                <span className='m-0 mt-4 text-xs font-medium uppercase'>{genre.name}Goofy Genre</span>
              ))}
            </p>
            <div className='flex my-2 space-x-2 text-xs font-semibold md:text-sm'>
              <p className='text-green-600'>{randomShow?.vote_average * 10 ?? '-'}% Match</p>
              <p className='text-gray-300'>{randomShow?.release_date ?? '-'}</p>
            </div>
            <TextTruncate
              line={truncLine}
              element='p'
              containerClassName='w-3/4 my-2 textTruncate text-sm'
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
            <div className='flex items-center mb-4'>
              <Rating
                name='movie-rating'
                value={randomShow.vote_average / 2}
                precision={0.5}
                icon={<StarRoundedIcon />}
              />
              <p className='mt-0 mb-2 ml-2 mr-0 hero__featuredLikes'>
                {/* {numeral(randomShow.vote_average / 2).format('0.0')}
                <small> ({numeral(randomShow.vote_count).format('0,0')})</small> */}
              </p>
            </div>

            <Button
              className='rounded-full text-[#3a6979] font-medium font-work bg-[#d7d7d7] hover:bg-white'
              variant='default'
              onClick={() => setPlaying(true)}
            >
              <Icons.play
                className='w-4 h-4 mr-2 text-blue-300 fill-current'
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

//         <p className='hero__featuredGenres'>
//           <span className='app__featuredCert'>PG-13</span>

//           <span className='app__featuredGenre'>Action</span>
//         </p>
//       </div>
//       <div className='grid max-w-lg pt-24 space-y-2 '>
//         <p className='text-xl font-light uppercase'>today&apos;s featured film</p>
//         <h1 className='text-4xl font-bold tracking-tighter md:text-4xl'>
//           {randomShow?.title ?? randomShow?.name}
//         </h1>
//         <div className='flex space-x-2 text-xs font-semibold md:text-sm'>
//           <p className='text-green-600'>{randomShow?.vote_average * 10 ?? '-'}% Match</p>
//           <p className='text-gray-300'>{randomShow?.release_date ?? '-'}</p>
//         </div>
//         <p className='text-sm text-gray-300 line-clamp-4 md:text-base'>
//           {randomShow?.overview ?? '-'}
//         </p>
//         <div className='flex items-center space-x-8 pt-1.5'>
//           <Button
//             aria-label='Play video'
//             className='h-auto gap-1.5 rounded-full bg-[#f5f5f5] text-cyan-800 uppercase'
//             onClick={() => {
//               modalStore.setShow(randomShow)
//               modalStore.setOpen(true)
//               modalStore.setPlay(true)
//             }}
//           >
//
//             Play Trailer
//           </Button>
//           <Button
//             aria-label="Open show's details modal"
//             // variant='outline'
//             className='h-auto gap-2 rounded hover:bg-transparent hover:outline-double'
//             onClick={() => {
//               modalStore.setShow(randomShow)
//               modalStore.setOpen(true)
//               modalStore.setPlay(false)
//             }}
//           >
//             <Icons.info className='w-5 h-5' aria-hidden='true' />
//             More Info
//           </Button>
//         </div>
//       </div>
//     </div>
//   )}
// </section>
//
// </>
