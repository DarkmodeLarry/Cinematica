import type { Show } from '@/types'
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
      `https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`
    ),
    fetch(
      `https://api.themoviedb.org/3/${mediaType}/top_rated?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`
    ),
    fetch(
      `https://api.themoviedb.org/3/discover/${mediaType}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&with_networks=213`
    ),
    fetch(
      `https://api.themoviedb.org/3/discover/${mediaType}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&with_genres=28`
    ),
    fetch(
      `https://api.themoviedb.org/3/discover/${mediaType}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&with_genres=35`
    ),
    fetch(
      `https://api.themoviedb.org/3/discover/${mediaType}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&with_genres=27`
    ),
    fetch(
      `https://api.themoviedb.org/3/discover/${mediaType}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&with_genres=10749`
    ),
    fetch(
      `https://api.themoviedb.org/3/discover/${mediaType}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&with_genres=99`
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

// Alternative to latest movies https://api.themoviedb.org/3/movie/latest?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US
// Switch to Trending for the day if movie/latest doesn't work.

export async function getNewAndPopularShows() {
  const [popularTvRes, popularMovieRes, trendingTvRes, trendingMovieRes] = await Promise.all([
    fetch(
      `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`
    ),
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`
    ),
    fetch(
      `https://api.themoviedb.org/3/trending/tv/day?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`
    ),
    fetch(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`
    )
  ])

  if (!popularTvRes.ok || !popularMovieRes.ok || !trendingTvRes.ok || !trendingMovieRes.ok) {
    throw new Error('Failed to fetch shows')
  }

  const [popularTvs, popularMovies, trendingTvs, trendingMovies] = (await Promise.all([
    popularTvRes.json(),
    popularMovieRes.json(),
    trendingTvRes.json(),
    trendingMovieRes.json()
  ])) as { results: Show[] }[]

  return {
    popularTvs: popularTvs?.results,
    popularMovies: popularMovies?.results,
    trendingTvs: trendingTvs?.results,
    trendingMovies: trendingMovies?.results
  }
}

export async function searchShows(query: string) {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/multi?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&query=${query}&page=1&include_adult=true`
  )

  if (!res.ok) {
    throw new Error('Failed to fetch shows')
  }

  const shows = (await res.json()) as { results: Show[] }

  const popularShows = shows.results.sort((a, b) => b.popularity - a.popularity)

  return {
    results: popularShows
  }
}

// export const getMovieInfo = async (movieInfo) => {
//   const res = await
// }
