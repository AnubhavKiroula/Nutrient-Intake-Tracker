import { redirect } from 'next/navigation'

/**
 * Root entry point — immediately redirect to the login screen.
 * After successful authentication, the MockAuthProvider redirects
 * the user to /dashboard automatically.
 */
export default function RootPage() {
  redirect('/login')
}
