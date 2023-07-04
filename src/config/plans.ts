import type { PlansConfig } from '@/types'

import { Icons } from '@/components/icons'

export const plansConfig: PlansConfig = {
  perks: [
    'Watch new Theater releases from the comfort of your phone, tablet, laptop, TV or Home Theater',
    'Unlimited movies and TV shows',
    'Change or cancel your plan anytime'
  ],
  plans: [
    {
      name: 'Chillax Mobile',
      screen: 'Mobile only',
      price: 14.99,
      videoQuality: 'Good',
      resolution: '480p SD Streaming',
      devices: [
        {
          title: 'Phone',
          icon: Icons.phone
        },
        {
          title: 'Tablet',
          icon: Icons.tablet
        }
      ]
    },
    {
      name: 'Chillax Lite',
      screen: 'Two screens',
      price: 19.99,
      videoQuality: 'Good',
      resolution: '720p SD Streaming',
      devices: [
        {
          title: 'Phone',
          icon: Icons.phone
        },
        {
          title: 'Tablet',
          icon: Icons.tablet
        },
        {
          title: 'Computer',
          icon: Icons.computer
        }
      ]
    },
    {
      name: 'Chillax HD',
      screen: 'Max 5 screens',
      shows: '2 shows per week',
      price: 29.99,
      videoQuality: 'Better',
      resolution: '1080p HD Streaming',
      devices: [
        {
          title: 'Phone',
          icon: Icons.phone
        },
        {
          title: 'Tablet',
          icon: Icons.tablet
        },
        {
          title: 'Computer',
          icon: Icons.computer
        },
        {
          title: 'TV',
          icon: Icons.tv
        }
      ]
    },
    {
      name: 'Chillax Theater',
      screen: 'Unlimited screens',
      price: 39.99,
      videoQuality: 'Best',
      resolution: '4K+HDR Streaming',
      devices: [
        {
          title: 'Phone',
          icon: Icons.phone
        },
        {
          title: 'Tablet',
          icon: Icons.tablet
        },
        {
          title: 'Computer',
          icon: Icons.computer
        },
        {
          title: 'TV',
          icon: Icons.tv
        },
        {
          title: 'Theater',
          icon: Icons.theater
        }
      ]
    }
  ]
}
