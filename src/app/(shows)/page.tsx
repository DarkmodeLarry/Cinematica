import type { CategorizedShows } from '@/types'

import { getShows } from '@/lib/fetchers'
// import {getCurrentUser} from '@/lib/auth'
import ShowsContainer from '@/components/shows-container'
import Hero from '@/components/hero'

export default async function Home() {
  // const user = await getCurrentUser()

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
      <div className='pt-10 pb-16'>
        <Hero shows={allShows.netflix ?? []} />
        <ShowsContainer shows={allShowsByCategory} />
      </div>
    </section>
  )
}
