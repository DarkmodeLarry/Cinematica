import { authOptions } from '@/server/auth'
import NextAuth from 'next-auth'

const handler = NextAuth(authOptions) as unknown

export { handler as GET, handler as POST }
// Here we export the handler as both GET and POST, so that it can be used for both types of requests. This is because NextAuth.js uses a POST request to handle the OAuth callback, but we want to use a GET request for the API route. This is because we want to redirect the user to the homepage after they have logged in, and we can't do that with a POST request.
