import { Skeleton } from '@/components/ui/skeleton'

export default function ShowsLoading() {
  return (
    <div className='container w-full pt-10 mx-0 overflow-x-auto overflow-y-hidden no-scrolbar'>
      <Skeleton className='h-[1.62rem] w-28 rounded bg-neutral-700' />
    </div>
  )
}
