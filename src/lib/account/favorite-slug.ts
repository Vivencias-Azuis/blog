import { z } from 'zod'

export const favoriteSlugSchema = z
  .string()
  .trim()
  .min(1)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)

export function parseFavoriteSlug(input: unknown) {
  return favoriteSlugSchema.safeParse(input)
}
