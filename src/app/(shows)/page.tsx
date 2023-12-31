import type { Metadata } from 'next'
import type { CategorizedShows } from '@/types'
import { getShows } from '@/lib/fetchers'
import { getCurrentUser } from '@/lib/session'
import ShowsContainer from '@/components/shows-container'
import Hero from '@/components/hero'
import SiteFooter from '@/components/layouts/site-footer'

export const metadata: Metadata = {
  title: 'Movies',
  description: 'All movies grouped by ratings'
}

export default async function Home() {
  const user = await getCurrentUser()

  const allShows = await getShows('movie')

  const allShowsByCategory: CategorizedShows[] = [
    {
      title: 'Trending Now',
      shows: allShows.trending
    },
    {
      title: 'Top Rated',
      shows: allShows.topRated
    },
    {
      title: 'Action Thrillers',
      shows: allShows.action
    },
    {
      title: 'Comedy',
      shows: allShows.comedy
    },
    {
      title: 'Scary Movies',
      shows: allShows.horror
    },
    {
      title: 'Romance Movies',
      shows: allShows.romance
    },
    {
      title: 'Documentaries',
      shows: allShows.docs
    }
  ]

  return (
    <section>
      <div className='relative w-full mx-auto my-0'>
        <Hero user={user} shows={allShows.netflix ?? []} />
        <ShowsContainer user={user} shows={allShowsByCategory} />
        <SiteFooter />
      </div>
    </section>
  )
}
