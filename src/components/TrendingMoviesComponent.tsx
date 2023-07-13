'use client'

import { Movie, MovieDetails } from '@/types'
import { getTrendingMovies } from '@/lib/fetchers'
import TextTruncate from 'react-text-truncate'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Button } from './ui/button'

interface TrendingMoviesProps {
  movie: Movie[]
  movieDetails: MovieDetails[]
}

/**
 * 1. Import the `getTrendingMovies` function from '@/lib/fetchers'
 * 2. Create a `TrendingMoviesComponent` component
 * 3. Fetch the trending movies on the server side with the useEffect hook and use the
 * async await syntax to fetch the trending movies with a try catch block.
 * 4. Set the trending movies to the state with the `setTrendingMovies` function
 * 5. Display the trending movies in the JSX
 *
 * @returns
 */
function TrendingMoviesComponent() {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([])
  const [movieId, setMovieId] = useState<Movie['id']>()

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
  const uniqueGenres = Array.from(new Set(displayTrendingMovies.flatMap((movie) => movie.genres)))

  const handleClick = (movie: string) => {
    setMovieId(movieId)
  }

  return (
    <div className='list bg-gradient-to-b from-[#2776C6] to-[#A4DBFF] flex w-full py-3 px-6 md:py-6 md:px-12'>
      <div className='relative mr-8 list__trending'>
        <h4 className='mb-8'>Popular Movies</h4>
        
        <div className='flex p-3 mr-8 -mt-3 -ml-3 overflow-y-scroll list__items scroll-pl-3'>
          {displayTrendingMovies &&
            displayTrendingMovies.map((movie) => (
              <div className='list__item' key={`${movie}`} onClick={() => handleClick}>
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
        <h4 className=''>Movies by Genre</h4>
        <div className='list_genre'>
          {displayTrendingMovies.map((genre) => (
            <Button
              className='app__button'
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
