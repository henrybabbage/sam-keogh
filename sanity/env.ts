export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-08-05'

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '36v6uuv9',
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)

export const readToken = process.env.SANITY_API_READ_TOKEN

// See the app/api/revalidate/route.ts for how this is used
export const revalidateSecret = process.env.SANITY_REVALIDATE_SECRET

export const useCdn = false

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
