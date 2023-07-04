import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { authOptions } from '@/server/auth'
import { plansConfig } from '@/config/plans'
import { getCurrentUser } from '@/lib/session'
import { stripe } from '@/lib/stripe'
import { getUserSubscriptionPlan } from '@/lib/subscription'
import BillingForm from '@/components/forms/billing-form'
import { Icons } from '@/components/icons'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Plans',
  description: 'Choose the plan that’s right for you'
}

export default async function PlansPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn ?? '/login')
  }

  // find subscription plan of user
  const subscriptionPlan = await getUserSubscriptionPlan(user.id)

  // if user has a subscription plan, check if it's active
  let isCanceled = false
  if (subscriptionPlan && subscriptionPlan.stripeSubscriptionId) {
    const stripePlan = await stripe.subscriptions.retrieve(subscriptionPlan.stripeSubscriptionId)
    isCanceled = stripePlan.cancel_at_period_end
  }

  return (
    <section className='profile container flex flex-col w-screen min-h-screen gap-5 pt-10 '>
      {/* <Image
        src={plansConfig.backgroundImage}
        placeholder='blur'
        blurDataURL={plansConfig.backgroundImage}
        alt='background'
        fill
        className='fixed -z-10 mix-blend-overlay'
      /> */}
      <h1 className='w-full pt-24 pb-16 text-3xl text-center f sm:text-4xl profile__header'>
        Subscribe now and start to Chillax
      </h1>

      <BillingForm subscriptionPlan={subscriptionPlan} isCanceled={isCanceled} />
      <div className='flex flex-col w-full gap-2 py-16'>
        {plansConfig.perks.map((perk, i) => (
          <div key={i} className='flex items-center'>
            <Icons.check className='mr-2 text-gray-300 h-7 w-7' aria-hidden='true' />
            <span className='text-gray-100 dark:text-gray-100'>{perk}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
