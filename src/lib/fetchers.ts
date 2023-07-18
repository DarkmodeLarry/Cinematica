import { env } from '@/env.mjs'
import type { MovieDetails, Show, Movie, Genre } from '@/types'
import type { MEDIA_TYPE } from '@prisma/client'

export async function getShows(mediaType: MEDIA_TYPE) {
  const [
    trendingRes,
    topRatedRes,
    netflixRes,
    actionRes,
    comedyRes,
    horrorRes,
    romanceRes,
    docRes
  ] = await Promise.all([
    fetch(
      `https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=${env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`
    ),
    fetch(
      `https://api.themoviedb.org/3/${mediaType}/top_rated?api_key=${env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`
    ),
    fetch(
      `https://api.themoviedb.org/3/discover/${mediaType}?api_key=${env.NEXT_PUBLIC_TMDB_API_KEY}&with_networks=213`
    ),
    fetch(
      `https://api.themoviedb.org/3/discover/${mediaType}?api_key=${env.NEXT_PUBLIC_TMDB_API_KEY}&with_genres=28`
    ),
    fetch(
      `https://api.themoviedb.org/3/discover/${mediaType}?api_key=${env.NEXT_PUBLIC_TMDB_API_KEY}&with_genres=35`
    ),
    fetch(
      `https://api.themoviedb.org/3/discover/${mediaType}?api_key=${env.NEXT_PUBLIC_TMDB_API_KEY}&with_genres=27`
    ),
    fetch(
      `https://api.themoviedb.org/3/discover/${mediaType}?api_key=${env.NEXT_PUBLIC_TMDB_API_KEY}&with_genres=10749`
    ),
    fetch(
      `https://api.themoviedb.org/3/discover/${mediaType}?api_key=${env.NEXT_PUBLIC_TMDB_API_KEY}&with_genres=99`
    )
  ])

  if (
    !trendingRes.ok ||
    !topRatedRes.ok ||
    !netflixRes.ok ||
    !actionRes.ok ||
    !comedyRes.ok ||
    !horrorRes.ok ||
    !romanceRes.ok ||
    !docRes.ok
  ) {
    throw new Error('Failed to fetch shows')
  }

  const [trending, topRated, netflix, action, comedy, horror, romance, docs] = (await Promise.all([
    trendingRes.json(),
    topRatedRes.json(),
    netflixRes.json(),
    actionRes.json(),
    comedyRes.json(),
    horrorRes.json(),
    romanceRes.json(),
    docRes.json()
  ])) as { results: Show[] }[]

  return {
    trending: trending?.results,
    topRated: topRated?.results,
    netflix: netflix?.results,
    action: action?.results,
    comedy: comedy?.results,
    horror: horror?.results,
    romance: romance?.results,
    docs: docs?.results
  }
}

export async function getMovieDetails(movieId: number): Promise<MovieDetails> {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`
  )

  if (!res.ok) {
    throw new Error('Failed to fetch movie details')
  }

  const movieDetails = (await res.json()) as MovieDetails
  console.log(movieDetails)

  return movieDetails
}

export async function getGenres() {
  const res = await fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
  )

  if (!res.ok) {
    throw new Error('Failed to fetch genres')
  }

  const genres = (await res.json()) as { genres: Genre[] }

  return {
    genres: genres?.genres
  }
}

export async function getTrendingMovies() {
  const res = await fetch(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=${env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`
  )

  if (!res.ok) {
    throw new Error('Failed to fetch trending movies')
  }

  const trendingMovies = (await res.json()) as { results: Movie[] }

  return {
    trendingMovies: trendingMovies?.results
  }
}

export async function searchShows(query: string) {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/multi?api_key=${
      env.NEXT_PUBLIC_TMDB_API_KEY
    }&query=${encodeURIComponent(query)}`
  )

  if (!res.ok) {
    throw new Error('Failed to find shows')
  }

  const shows = (await res.json()) as { results: Show[] }

  const popularShows = shows.results.sort((a, b) => b.popularity - a.popularity)

  return {
    results: popularShows
  }
}

export async function searchMovies(query: string) {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${
      env.NEXT_PUBLIC_TMDB_API_KEY
    }&query=${encodeURIComponent(query)}`
  )

  if (!res.ok) {
    throw new Error('Failed to find movie')
  }

  const movies = (await res.json()) as { results: Movie[] }

  const popularMovies = movies.results.sort((a, b) => b.popularity - a.popularity)

  return {
    results: popularMovies
  }
}

export async function getTopRatedMovies(mediaType: MEDIA_TYPE) {
  const [topRatedMoviesRes] = await Promise.all([
    fetch(
      `https://api.themoviedb.org/3/${mediaType}/top_rated?api_key=${env.NEXT_PUBLIC_TMDB_API_KEY}$language=en-US`
    )
  ])

  const [popularMovies, topRatedMovies] = (await Promise.all([topRatedMoviesRes.json()])) as {
    results: Movie[]
  }[]

  return {
    topRatedMovies: topRatedMovies?.results
  }
}
