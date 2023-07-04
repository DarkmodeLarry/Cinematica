'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { toast } from 'react-hot-toast'

import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { RiDiscordLine } from 'react-icons/ri'

const LoginButton = () => {
  const [isLoading, setIsLoading] = useState(false)

  const loginWithGoogle = async () => {
    setIsLoading(true)
    try {
      await signIn('google')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Something went wrong')
    } finally {
      setTimeout(() => setIsLoading(false), 2500)
    }
  }

  const loginWithDiscord = async () => {
    setIsLoading(true)
    try {
      await signIn('discord')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Something went wrong')
    } finally {
      setTimeout(() => setIsLoading(false), 2500)
    }
  }

  return (
    <>
      <Button
        aria-label='Login with Google'
        variant='default'
        className='w-full'
        onClick={isLoading ? undefined : loginWithGoogle}
        disabled={isLoading}
      >
        {isLoading ? (
          <Icons.spinner className='w-4 h-4 mr-2 animate-spin' aria-hidden='true' />
        ) : (
          <Icons.google className='w-4 h-4 mr-2' aria-hidden='true' />
        )}
        Google
      </Button>
      <Button
        aria-label='Login with Discord'
        variant='default'
        className='w-full'
        onClick={isLoading ? undefined : loginWithDiscord}
        disabled={isLoading}
      >
        {isLoading ? (
          <Icons.spinner className='w-4 h-4 mr-2 animate-spin' aria-hidden='true' />
        ) : (
          <RiDiscordLine className='w-6 h-6 mr-2' aria-hidden='true' />
        )}
        Discord
      </Button>
    </>
  )
}

export default LoginButton
