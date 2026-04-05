import { requireUser } from '@/lib/auth/auth'
import type { ReactNode } from 'react'

export default async function MinhaAreaLayout({
  children,
}: {
  children: ReactNode
}) {
  await requireUser()

  return children
}
