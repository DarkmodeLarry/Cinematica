import ProfileScreen from "@/components/screens/profile-screen";

interface ShowsLayoutProps {
  children: React.ReactNode;
}

export default async function ShowsLayout({ children }: ShowsLayoutProps) {
  //TODO: look for a way to use zustand profile state here

  return <ProfileScreen>{children}</ProfileScreen>;
}
