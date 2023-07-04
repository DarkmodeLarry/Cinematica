import Image from 'next/image'
import tmbdIcon from '@/assets/tmdb.svg'

export const Footer = () => {
  return (
    <div className='grid p-4 pt-12 sm:pt-20 place-items-center bg-gradient-to-b from-[#2c3e50] to-[#4ca1af]'>
      <Image src={tmbdIcon} alt='movie icon' height={50} />
      <p className='w-full text-center whitespace-nowrap'>
        <a href='https://dashsantosh.ga'>@Larry </a> |{' '}
        <a href='https://github.com/santdas36'> GitHub</a>
      </p>
    </div>
  )
}

export default Footer
