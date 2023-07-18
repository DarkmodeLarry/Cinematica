import { FC } from 'react'
import Image from 'next/image'
import tmbdIcon from '@/assets/tmdb.svg'

interface SiteFooterProps {
  children?: React.ReactNode
}

const SiteFooter = ({ children }: SiteFooterProps) => {
  return (
    <div className='grid place-items-center bg-gradient-to-t from-slate-800 via-slate-500 to-slate-800 pt-10 h-72'>
      <Image src={tmbdIcon} alt='movie icon' height={70} />
      <p className='w-full text-center whitespace-nowrap'>
        <a href='https://dashsantosh.ga'>@Larry </a> |{' '}
        <a href='https://github.com/santdas36'> GitHub</a>
      </p>
    </div>
  )
}

export default SiteFooter
