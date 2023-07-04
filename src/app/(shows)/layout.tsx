import ProfileScreen from '@/components/screens/profile-screen'
import { getSession } from '@/lib/session'

interface ShowsLayoutProps {
  children: React.ReactNode
}

export default async function ShowsLayout({ children }: ShowsLayoutProps) {
  const session = await getSession()
  //TODO: look for a way to use zustand profile state here

  return <ProfileScreen session={session}>{children}</ProfileScreen>
}

// Property 'session' is missing in type '{ children: ReactNode; }' but required in type 'ProfilesScreenProps'.ts(2741)
// profile-screen.tsx(20, 3): 'session' is declared here.
// ⚠ Error (TS2741)  |
// Property session   is missing in type
//  but required in type
//  .
// (alias) const ProfileScreen: ({ session, children }: ProfilesScreenProps) => React.JSX.Element
// import ProfileScreen
