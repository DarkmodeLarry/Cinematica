import type { Icon, MEDIA_TYPE, Profile, User } from '@prisma/client'

export type SetState<T> = React.Dispatch<React.SetStateAction<T>>

export type NavItem = {
  title: string
  href?: string
  onClick?: () => void
  disabled?: boolean
  external?: boolean
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

export type SiteConfig = {
  name: string
  description: string
  url: string
  ogImage: string
  links: {
    twitter: string
    github: string
  }
  mainNav: NavItem[]
  profileDropdownItems: NavItem[]
  footerItems: NavItem[]
  socialLinks: NavItem[]
}

export type PlansConfig = {
  perks: string[]
  plans: {
    name: 'Chillax Mobile' | 'Chillax Lite' | 'Chillax HD' | 'Chillax Theater'
    screen: 'Mobile only' | 'Two screens' | 'Max 5 screens' | 'Unlimited screens'
    price: number
    videoQuality: 'Good' | 'Better' | 'Best' | 'Theater'
    resolution:
      | '480p SD Streaming'
      | '720p SD Streaming'
      | '1080p HD Streaming'
      | '4K+HDR Streaming'
    devices: {
      title: 'Phone' | 'Tablet' | 'Computer' | 'TV' | 'Theater'
      icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
    }[]
  }[]
}

export type VideoType =
  | 'Bloopers'
  | 'Featurette'
  | 'Behind the Scenes'
  | 'Clip'
  | 'Trailer'
  | 'Teaser'

export type VideoResult = {
  iso_639_1: string
  iso_3166_1: string
  name: string
  key: string
  site: string
  size: number
  type: VideoType
  official: boolean
  published_at: string
  id: string
}

export type Show = {
  adult: boolean
  backdrop_path: string | null
  media_type: MEDIA_TYPE
  budget: number | null
  homepage: string | null
  showId: string
  id: number
  imdb_id: string | null
  original_language: string
  original_title: string | null
  overview: string | null
  popularity: number
  poster_path: string | null
  number_of_seasons: number | null
  number_of_episodes: number | null
  release_date: string
  first_air_date: string
  last_air_date: string
  certification: string | null
  revenue: number | null
  runtime: number | null
  status: string | null
  tagline: string | null
  title: string | null
  name: string | null
  video: boolean
  vote_average: number
  vote_count: number
}

export type Movie = {
  adult: boolean
  certification: string | null
  backdrop_path: string | null
  media_type: MEDIA_TYPE
  budget: number | null
  homepage: string | null
  showId: string
  id: number
  imdb_id: string | null
  original_language: string
  original_title: string | null
  overview: string | null
  popularity: number
  poster_path: string | null
  number_of_seasons: number | null
  number_of_episodes: number | null
  release_date: string | null
  first_air_date: string | null
  last_air_date: string | null
  revenue: number | null
  runtime: number | null
  status: string | null
  tagline: string | null
  title: string | null
  name: string | null
  video: boolean
  vote_average: number
  vote_count: number
}

export type MovieDetails = {
  certification: string | null
  media_type: string
  primary_release_year: number
  primary_release_date: string
  movieId: string
  id: number
  imdb_id: string | null
  original_language: string
  original_title: string | null
  overview: string | null
  popularity: number
  poster_path: string | null
  release_date: string | null
  revenue: number
  runtime: number
  status: string
  tagline: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
  videos?: {
    results: VideoResult[]
  }
}

export type ShowWithGenreAndVideo = Show & {
  genres: Genre[]
  videos?: {
    results: VideoResult[]
  }
}

export type SessionUser = {
  id: string
} & {
  name?: string | null
  email?: string | null
  image?: string | null
}

export type CategorizedShows = {
  title: string
  shows?: Show[]
}

export type SubscriptionPlan = {
  name: string
  description: string
  stripePriceId: string
  monthlyPrice?: number
  videoQuality?: string
  resolution?: string
  devices?: string
}

export type UserSubscriptionPlan = SubscriptionPlan &
  Pick<User, 'stripeCustomerId' | 'stripeSubscriptionId' | 'stripePriceId'> & {
    stripeCurrentPeriodEnd: number
  }

export type ProfileWithIcon = Profile & {
  icon: Icon
}

export type PickedIcon = Pick<Icon, 'id' | 'title' | 'href'>

export type PickedProfile = Pick<
  Profile,
  'id' | 'name' | 'language' | 'gameHandle' | 'email' | 'pin'
> & {
  icon: PickedIcon
}

export type Genre = {
  id: number
  name: string
}

export type Genres = [
  {
    id: 28
    name: 'Action'
  },
  {
    id: 12
    name: 'Adventure'
  },
  {
    id: 16
    name: 'Animation'
  },
  {
    id: 35
    name: 'Comedy'
  },
  {
    id: 80
    name: 'Crime'
  },
  {
    id: 99
    name: 'Documentary'
  },
  {
    id: 18
    name: 'Drama'
  },
  {
    id: 10751
    name: 'Family'
  },
  {
    id: 14
    name: 'Fantasy'
  },
  {
    id: 36
    name: 'History'
  },
  {
    id: 27
    name: 'Horror'
  },
  {
    id: 10402
    name: 'Music'
  },
  {
    id: 9648
    name: 'Mystery'
  },
  {
    id: 10749
    name: 'Romance'
  },
  {
    id: 878
    name: 'Science Fiction'
  },
  {
    id: 10770
    name: 'TV Movie'
  },
  {
    id: 53
    name: 'Thriller'
  },
  {
    id: 10752
    name: 'War'
  },
  {
    id: 37
    name: 'Western'
  }
]
