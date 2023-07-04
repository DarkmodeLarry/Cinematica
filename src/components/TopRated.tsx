import TextTruncate from 'react-text-truncate'
import defaultImage from '@/assets/default.jpg'
import numeral from 'numeral'
import { getShows } from '@/lib/fetchers'
import requests, { imageBase } from '@/components/api'

export default function TopRated({ fetchId, title, setMovieId, setLoading, type, notGradient }) {
  return (
    <div className='list biglist bigList_gradient'>
      <div className='list__trending list__big'>
        <h4>Title</h4>
      </div>
      <h1>Top Rated</h1>
    </div>
  )
}
