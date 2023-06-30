'use client'
import UserAuthForm from './UserAuthForm'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Icons } from '../icons'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

const SignIn = () => {
  return (
    <div className='container z-50 w-3/4 h-[500px] bg-blue-900 bg-opacity-50 border rounded-3xl flex flex-col -mt-6 sm:w-[400px]'>
      <motion.div
        initial={{ opacity: 0, y: '5rem' }}
        exit={{ opacity: 0, y: '5rem' }}
        animate={{ opacity: 1, y: 0 }}
        layout
        className='flex flex-col w-full pt-10 rounded-md'
      >
        <h1 className='m-6 text-2xl font-semibold tracking-tight'>Welcome back!</h1>
        <div className='container w-full h-full mx-auto '>
          <h1 className='mb-4 text-3xl font-bold text-left'>Login</h1>
          <div className='flex flex-col w-full space-y-6 text-center'>
            <Label className='text-left translate-y-3'>Email Address</Label>
            <Input type='email' placeholder='Email' />
            <Label className='text-left translate-y-3'>Password</Label>
            <Input type='email' placeholder='Email' />
            <p className='max-w-xs mx-auto text-sm'>By logging in, you agree to everything.</p>

            <UserAuthForm />
            <div className=''>
              <p className='px-8 text-sm text-center unerline underline-offset-4'>
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
