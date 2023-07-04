'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Icons } from '../icons'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import LoginButton from '@/components/login-button'

const SignIn = () => {
  return (
    <div className='form w-full'>
      <motion.div
        initial={{ opacity: 0, y: '5rem' }}
        exit={{ opacity: 0, y: '5rem' }}
        animate={{ opacity: 1, y: 0 }}
        layout
        className='flex flex-col w-full pt-8 rounded-md bg-zinc-800/25'
      >
        <h1 className='text-xl font-mulish tracking-tight'>WELCOME BACK!</h1>
        <div className=' w-full h-full mx-auto '>
          <h1 className='text-2xl uppercase font-work font-bold text-left py-5'>Login</h1>
          <div className='flex flex-col w-full space-y-3 text-center'>
            <Input type='email' placeholder='Email' className='flex flex-col mb-6 w-full' />
            <Input type='email' placeholder='Password' />
            <p className='max-w-xs mx-auto text-sm py-5'>By logging in, you agree to everything.</p>

            <LoginButton />
            <div className='mb-10'>
              <p className='text-sm text-center unerline underline-offset-4'>
                New to Chillax{' '}
                <Link
                  href='/signup'
                  className='text-sm underline hover:text-brand underline-offset-4'
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default SignIn
