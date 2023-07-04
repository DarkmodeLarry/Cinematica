import { env } from '@/env.mjs'
import type { SubscriptionPlan } from '@/types'

export const mobilePlan: SubscriptionPlan = {
  name: 'Chillax Mobile',
  description: 'The plan is suitable for mobile devices.',
  stripePriceId: process.env.STRIPE_MOBILE_PRICE_ID ?? '',
  monthlyPrice: 14.99,
  videoQuality: 'Good',
  resolution: '480p',
  devices: 'Phone, Tablet'
}

export const basicPlan: SubscriptionPlan = {
  name: 'Chillax Basic',
  description: 'The plan is suitable for basic devices.',
  stripePriceId: process.env.STRIPE_BASIC_PRICE_ID ?? '',
  monthlyPrice: 19.99,
  videoQuality: 'Good',
  resolution: '720p',
  devices: 'Phone, Tablet, Computer, TV'
}

export const standardPlan: SubscriptionPlan = {
  name: 'Chillax Standard',
  description: 'The plan is suitable for standard devices.',
  stripePriceId: process.env.STRIPE_STANDARD_PRICE_ID ?? '',
  monthlyPrice: 29.99,
  videoQuality: 'Better',
  resolution: '1080p',
  devices: 'Phone, Tablet, Computer, TV'
}

export const premiumPlan: SubscriptionPlan = {
  name: 'Chillax Theater',
  description: 'The plan is suitable for premium devices.',
  stripePriceId: process.env.STRIPE_PREMIUM_ ?? '',
  monthlyPrice: 39.99,
  videoQuality: 'Best',
  resolution: '4K+HDR',
  devices: 'Phone, Tablet, Computer, TV, Projector'
}

export const subscriptionPlans = [mobilePlan, basicPlan, standardPlan, premiumPlan]
