'use client'

import * as React from 'react'
import Link from 'next/link'
import type { UserSubscriptionPlan } from '@/types'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { toast } from 'react-hot-toast'

import { plansConfig } from '@/config/plans'
import { cn } from '@/lib/utils'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'

interface BillingFormProps {
  subscriptionPlan: UserSubscriptionPlan | null
  isCanceled: boolean
}

const BillingForm = ({ subscriptionPlan, isCanceled }: BillingFormProps) => {
  const [selectedPlan, setSelectedPlan] = React.useState(
    plansConfig.plans[plansConfig.plans.length - 1]
  )
  const [isLoading, setIsLoading] = React.useState(false)

  async function handleSubscription() {
    console.log('handleSubscription')

    setIsLoading(true)

    // Get a Stripe session URL.
    const response = await fetch('/api/users/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        planName: selectedPlan?.name
      })
    })

    if (!response?.ok) {
      return toast.error('Something went wrong. Please refresh the page and try again.')
    }

    // Redirect to the Stripe session.
    // This could be a checkout page for initial upgrade.
    // Or portal to manage existing subscription.
    const session = (await response.json()) as { url: string }
    if (session) {
      window.location.href = session.url
    }

    setIsLoading(false)
  }

  return (
    <section aria-label='Billing form for various subscription plans' className='w-full h-full'>
      <div className='space-y-6'>
        <div className='flex justify-center w-full overflow-x-auto'>
          <ScrollArea className='w-screen py-5'>
            <div className='packs flex flex-wrap gap-4 w-full max-w-[1024px] mx-auto mt-0'>
              {plansConfig.plans.map((plan, i) => (
                <div
                  key={i}
                  className={cn(
                    'bg-[#f5f5f5] rounded-lg flex-[0.25] text-[#2c3e50] p-4 text-center flex flex-col max-w-[240px] transition-all duration-200 ',
                    selectedPlan === plan
                      ? 'opacity-100 hover:cursor-pointer border border-slate-900'
                      : 'opacity-70 cursor-pointer hover:opacity-90'
                  )}
                  onClick={() => setSelectedPlan(plan)}
                >
                  <div className='flex flex-col w-full space-y-6'>
                    <h3 className='w-full my-0 text-lg font-mulish'>{plan.name}</h3>
                    <ul className='w-full p-0 mb-3 leading-7 desc'>
                      <li className=''>{plan.screen}</li>
                      <li className=''>{plan.resolution}</li>
                      <li className='mt-10 font-bold'>
                        ${plan.price}
                        <span className='text-sm font-thin'>/month</span>
                      </li>
                    </ul>
                    <Button
                      aria-label={`Select ${plan.name} plan`}
                      variant='brand'
                      className='w-full max-w-sm rounded text-md font-mulish'
                      onClick={() => setSelectedPlan(plan)}
                    >
                      Activate Now
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
      <div className='grid w-full mt-10 place-items-center'>
        <Button
          aria-label='Subscribe to selected plan'
          variant='default'
          className='w-full max-w-sm rounded'
          onClick={() => void handleSubscription()}
          disabled={isLoading}
        >
          {isLoading && <Icons.spinner className='w-4 h-4 mr-2 animate-spin' aria-hidden='true' />}
          {subscriptionPlan && !isCanceled && subscriptionPlan.name === selectedPlan?.name
            ? 'Update'
            : 'Subscribe'}
        </Button>
      </div>
    </section>
  )
}

export default BillingForm
