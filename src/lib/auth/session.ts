import 'server-only'

import { auth } from '@clerk/nextjs/server'

/**
 * Returns the authenticated Clerk user ID, or throws when unauthenticated.
 */
export async function requireAuthUserId(): Promise<string> {
  const { userId } = await auth()

  if (!userId) {
    throw new Error('Unauthorized')
  }

  return userId
}
