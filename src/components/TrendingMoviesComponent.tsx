'use client'

import { Movie, MovieDetails, Genre } from '@/types'
import { getTrendingMovies, getGenres } from '@/lib/fetchers'
import axios from 'axios'
import TextTruncate from 'react-text-truncate'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Button } from './ui/button'

interface TrendingMoviesProps {
  movie: Movie[]
  movieDetails: MovieDetails[]
}

interface GenreResponse {
  genres: Genre[]
}

function TrendingMoviesComponent() {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([])
  const [movieId, setMovieId] = useState<Movie['id']>()
  const [genres, setGenres] = useState<Genre[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await getGenres()
      setGenres(response.genres)
    }
    fetchData()
    console.log(genres)
  }, [])

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const { trendingMovies } = await getTrendingMovies()
        setTrendingMovies(trendingMovies)
        console.log(trendingMovies)
      } catch (error) {
        console.error('failed to fetch trending movies:', error)
      }
    }

    fetchTrendingMovies()
  }, [])

  const displayTrendingMovies = trendingMovies.slice(0, 12) // limit to 12 movies

  // extract unique genres from trendingMovies
  // const uniqueGenres = Array.from(new Set(displayTrendingMovies.flatMap((movie) => movie.genres)))

  const handleClick = (movie: string) => {
    setMovieId(movieId)
  }

  return (
    <div className='list bg-gradient-to-b from-blue-600 via-blue-600 to-slate-700 flex w-full pb-3 px-6 md:pt-6 md:px-12'>
      <div className='relative mr-8 list__trending'>
        <h4 className='mb-8 font-dyna text-4xl font-bold'>Popular Movies</h4>

        <div className='flex p-3 mr-8 -mt-3 -ml-3 overflow-y-scroll list__items scroll-pl-3'>
          {displayTrendingMovies &&
            displayTrendingMovies.map((movie, i) => (
              <div className='list__item' key={`${movie}-${i}`} onClick={() => handleClick}>
                <Image
                  key={movie.id}
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={`movie.title`}
                  width={240}
                  height={135}
                  loading='lazy'
                  className='list__itemImage'
                />
                <div className='list__item__info'>
                  <h5 className='list__itemTitle'>{movie.title}</h5>
                  <TextTruncate
                    line={2}
                    element='p'
                    // containerClassName='list__itemOverview'
                    truncateText='...'
                    text={movie.overview as string}
                  />
                  <div className='list__rating'>
                    <div className='rating'>Rating</div>
                    <small className='list__likes'>likes</small>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className='list__genreList'>
        <h4 className='text-4xl font-bold font-dyna'>Movies by Genre</h4>
        <div className='list__genre w-full'>
          {genres.map((genre, i) => (
            <Button
              key={i}
              className='app__button uppercase font-work font-medium tracking-wider bg-[#f8f8f8] text-sky-600 rounded-full m-1 text-md p-6'
              onClick={() => console.log(genre.name, genre.id)}
              variant='default'
            >
              {genre.name}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
export default TrendingMoviesComponent
