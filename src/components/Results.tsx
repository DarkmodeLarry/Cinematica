import React from 'react'
import Button from '@material-ui/core/Button'
import StarRoundedIcon from '@material-ui/icons/StarRounded'
import Rating from '@mui/material/Rating'
import TextTruncate from 'react-text-truncate'
import defaultImage from './assets/default.jpg'
import { imageBase } from './api'
import { SearchResultItem } from './types'

interface ResultsProps {
  searchResult: SearchResultItem[]
  setMovieId: (movieId: SearchResultItem) => void
  setLoading: (loading: boolean) => void
}

function Results({ searchResult, setMovieId, setLoading }: ResultsProps) {
  const handleClick = (movie: SearchResultItem) => {
    setMovieId(movie)
    setLoading(true)
  }

  const getReleaseYear = (date: string) => {
    const year = new Date(date)
    return year.getFullYear()
  }

  return (
    <div className='results'>
      <h4>Search Results</h4>
      <div className='results__list'>
        {searchResult?.map((movie) =>
          movie.media_type !== 'person' ? (
            <div className='list__item' onClick={() => handleClick(movie)}>
              <img
                onError={(e) => {
                  e.target.onerror = null
                  e.target.src = defaultImage
                }}
                src={`${imageBase}${movie.poster_path || movie.backdrop_path}`}
              />
              <h5 className='list__itemType'>{movie.media_type}</h5>
              <div className='list__itemInfo'>
                <h5 className='list__itemTitle'>
                  {movie.title || movie.original_title || movie.name || movie.original_name}
                  <span className='list__itemYear'>
                    ({getReleaseYear(movie.release_date || movie.first_air_date)})
                  </span>
                </h5>
                <TextTruncate
                  line={2}
                  element='p'
                  containerClassName='list__itemOverview'
                  truncateText='…'
                  text={movie.overview}
                />
                <div className='list__rating'>
                  <Rating
                    name='movie-rating'
                    className='movieRating'
                    value={movie.vote_average / 2 || 0}
                    precision={0.5}
                    icon={<StarRoundedIcon fontSize='inherit' readOnly />}
                  />
                  <small className='list__likes'>{movie.vote_average / 2}</small>
                </div>
              </div>
            </div>
          ) : null
        )}
      </div>
    </div>
  )
}

export default Results
