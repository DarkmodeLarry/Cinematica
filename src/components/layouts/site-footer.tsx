import { FC } from 'react'
import Image from 'next/image'
import tmbdIcon from '@/assets/tmdb.svg'

interface SiteFooterProps {
  children?: React.ReactNode
}

const SiteFooter = ({ children }: SiteFooterProps) => {
  return (
    <div className='grid p-4 pt-12 sm:pt-20 place-items-center bg-gradient-to-t from-[#3a3452] to-[#695e96]'>
      <Image src={tmbdIcon} alt='movie icon' height={50} />
      <p className='w-full text-center whitespace-nowrap'>
        <a href='https://dashsantosh.ga'>@Larry </a> |{' '}
        <a href='https://github.com/santdas36'> GitHub</a>
      </p>
    </div>
  )
}

export default SiteFooter
