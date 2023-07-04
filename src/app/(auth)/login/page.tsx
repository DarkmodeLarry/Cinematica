import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { prisma } from '@/server/db'

import SignIn from '@/components/forms/SignIn'
import { getCurrentUser } from '@/lib/session'

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your account'
}

export default async function LoginPage() {
  const user = await getCurrentUser()

  if (user) {
    // find user in db by id
    const dbUser = await prisma.user.findUnique({
      where: {
        id: user.id
      }
    })

    // redirect to plans page if user doesn't have a subscription
    // otherwise redirect to home page
    if (!dbUser?.stripeCustomerId) {
      redirect('/login/plans')
    } else {
      redirect('/')
    }
  }

  return (
    <section className='login'>
      <SignIn />
    </section>
  )
}
