'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import type { PickedProfile } from '@/types'

import { api } from '@/lib/api/api'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

interface ManageProfilesProps {
  profiles: PickedProfile[]
}

const ManageProfiles = ({ profiles }: ManageProfilesProps) => {
  const router = useRouter()

  // profiles query
  const profilesQuery = api.profile.getAll.useQuery()

  return (
    <div className='container flex flex-col items-center justify-center w-full max-w-5xl min-h-screen space-y-8'>
      <h1 className='text-3xl font-medium text-center sm:text-4xl'>Manage Profiles:</h1>
      <div className='flex flex-wrap items-start justify-center gap-2 pb-8 sm:gap-4 md:gap-8'>
        {profilesQuery.data?.map((profile) => (
          <Button
            aria-label='Navigate to edit profile page'
            key={profile.id}
            variant='ghost'
            className='group h-auto flex-col space-y-2 p-0 hover:bg-transparent focus:ring-0 focus:ring-offset-0 active:scale-[0.98] dark:hover:bg-transparent'
            onClick={() => router.push(`/profiles/${profile.id}`)}
          >
            <div className='relative h-24 overflow-hidden rounded shadow-sm aspect-square w-fit group-hover:ring-2 group-hover:ring-slate-500 sm:h-28 md:h-32'>
              {profile.icon ? (
                <Image
                  src={profile.icon.href}
                  alt={profile.icon.title}
                  fill
                  sizes='(max-width: 768px) 100vw, 
                    (max-width: 1200px) 50vw, 33vw'
                  priority
                  className='object-cover'
                />
              ) : (
                <Skeleton className='w-full h-full bg-neutral-700' />
              )}
              <div className='absolute inset-0 w-full h-full bg-neutral-800/50' />
              <div className='absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2'>
                <Icons.edit className='w-8 h-8 text-slate-100' aria-hidden='true' />
              </div>
            </div>
            <div className='flex flex-col items-center justify-center gap-5'>
              <h2 className='text-sm text-slate-400 group-hover:text-slate-50 sm:text-base'>
                {profile.name}
              </h2>
              {profile.pin && (
                <Icons.lock className='w-4 h-4 text-slate-400' aria-label='Private profile' />
              )}
            </div>
          </Button>
        ))}
        {profilesQuery.isSuccess && profilesQuery.data.length < 5 && (
          <Button
            aria-label='Navigate to add profile page'
            variant='ghost'
            className='group h-auto flex-col space-y-2 p-0 pb-8 hover:bg-transparent focus:ring-0 focus:ring-offset-0 active:scale-[0.99] dark:hover:bg-transparent'
            onClick={() => router.push('/profiles/add')}
          >
            <div className='relative h-24 overflow-hidden rounded aspect-square w-fit bg-neutral-800 group-hover:border-2 group-hover:border-slate-500 sm:h-28 md:h-32'>
              <div className='absolute p-1 -translate-x-1/2 -translate-y-1/2 rounded-full left-1/2 top-1/2 ring-2 ring-slate-50'>
                <Icons.add className='w-8 h-8 text-slate-100' aria-hidden='true' />
              </div>
            </div>
            <h2 className='text-sm text-slate-400 group-hover:text-slate-50 sm:text-base'>
              Add Profile
            </h2>
          </Button>
        )}
      </div>
      <Button
        aria-label='Navigate to home page'
        variant='flat'
        size='auto'
        onClick={() => void router.push('/')}
      >
        Done
      </Button>
    </div>
  )
}

export default ManageProfiles
