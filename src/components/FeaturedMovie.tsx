'use client'

import React, { type FC, useState } from 'react'
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded'
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded'
import Grow from '@mui/material/Grow'
import Rating from '@mui/material/Rating'
import Button from '@mui/material/Button'
import TextTruncate from 'react-text-truncate'
import ModalVideo from 'react-modal-video'
import numeral from 'numeral'
import '@/styles/modalVideo.css'
import '@/styles/FeaturedMovie.css'

interface FeaturedMovieProps {
  title: string
  overlayStyle: React.CSSProperties
  featuredMovie: {
    title: string
    original_title: string
    name: string
    original_name: string
    release_date: string
    genres?: { name: string }[]
    overview: string
    vote_average: number
    vote_count: number
    number_of_seasons: number
    number_of_episodes: number
  }
  featuredCertification: string
  videoId: string
  setTruncLine: React.Dispatch<React.SetStateAction<number>>
  truncLine: number
}

const FeaturedMovie: React.FC<FeaturedMovieProps> = ({
  title,
  overlayStyle,
  featuredMovie,
  featuredCertification,
  videoId,
  setTruncLine,
  truncLine
}) => {
  const [playing, setPlaying] = useState(false)

  const readMore = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    setTruncLine(0)
    e.preventDefault()
    e.currentTarget.style.display = 'none'
  }

  const getReleaseYear = (date: string | undefined) => {
    if (date) {
      const year = new Date(date)
      return year.getFullYear()
    }
    return ''
  }

  return (
    <div className='app__featured'>
      {videoId && (
        <Grow in={playing} mountOnEnter unmountOnExit>
          <ModalVideo
            channel='youtube'
            isOpen={true}
            videoId={videoId}
            onClose={() => setPlaying(false)}
          />
        </Grow>
      )}
      <div className='app__overlay' style={overlayStyle}></div>
      <p className='app__featuredInfo'>{title}</p>
      <h2 className='app__featuredTitle'>
        {featuredMovie.title ||
          featuredMovie.original_title ||
          featuredMovie.name ||
          featuredMovie.original_name}
        <span className='app__featuredYear'>
          ({getReleaseYear(featuredMovie.release_date || featuredMovie.first_air_date)})
        </span>
      </h2>
      <p className='app__featuredGenres'>
        <span className='app__featuredCert'>{featuredCertification}</span>
        {featuredMovie?.genres?.slice(0, 3).map((genre, index) => (
          <span key={index} className='app__featuredGenre'>
            {genre.name}
          </span>
        ))}
      </p>
      <TextTruncate
        line={truncLine}
        element='p'
        containerClassName='app__featuredDesc'
        textTruncateChild={
          <a href='#' onClick={readMore}>
            <small>[more]</small>
          </a>
        }
        truncateText='…'
        text={featuredMovie.overview}
      />
      {featuredMovie.number_of_seasons && (
        <p className='app__seriesSeasons'>
          {featuredMovie.number_of_seasons} Seasons, {featuredMovie.number_of_episodes} Episodes
        </p>
      )}
      <div className='app__featuredRating'>
        <Rating
          name='movie-rating'
          value={featuredMovie.vote_average / 2}
          precision={0.5}
          icon={<StarRateRoundedIcon fontSize='inherit' readOnly />}
        />
        <p className='app__featuredLikes'>
          {numeral(featuredMovie.vote_average / 2).format('0.0')}
          <small> ({numeral(featuredMovie.vote_count).format('0,0')})</small>
        </p>
      </div>
      <Button
        className='app__button'
        variant='contained'
        onClick={() => setPlaying(true)}
        startIcon={<PlayArrowRoundedIcon />}
      >
        Play Trailer
      </Button>
    </div>
  )
}

export default FeaturedMovie
