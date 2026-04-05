import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export async function requireUser() {
  const session = await auth()

  if (!session.userId) {
    redirect('/sign-in')
  }

  const user = await currentUser()

  return {
    userId: session.userId,
    user,
  }
}
