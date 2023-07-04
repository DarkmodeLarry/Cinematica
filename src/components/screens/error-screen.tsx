import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'

interface ErrorScreenProps {
  error: Error
  reset: () => void
}

const ErrorScreen = ({ error, reset }: ErrorScreenProps) => {
  return (
    <section
      aria-label='Error screen'
      role='alert'
      className='container grid items-center justify-center max-w-5xl min-h-screen gap-6 pt-6 pb-8 md:pb-12 md:pt-10 lg:pb-24 lg:pt-16'
    >
      <div className='flex flex-col items-center justify-center w-full h-full space-y-4'>
        <Icons.warning className='text-red-500 h-28 w-28 dark:text-red-500' aria-hidden='true' />
        <h1 className='text-2xl font-bold text-center text-red-500 dark:text-red-500 sm:text-2xl lg:text-3xl'>
          {error.message ?? 'Something went wrong!'}
        </h1>
        <Button aria-label='Retry' variant='flat' onClick={() => reset()}>
          <Icons.refresh className='w-4 h-4 mr-2' aria-hidden='true' />
          Retry
        </Button>
      </div>
    </section>
  )
}

export default ErrorScreen
