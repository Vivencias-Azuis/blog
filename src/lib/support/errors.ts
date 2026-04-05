export class SupportRouteError extends Error {
  readonly status: number

  constructor(status: number, message: string) {
    super(message)
    this.name = 'SupportRouteError'
    this.status = status
  }
}

export function resolveSupportRouteError(
  error: unknown,
  fallback: {
    message: string
    status: number
  },
) {
  if (error instanceof SupportRouteError) {
    return {
      message: error.message,
      status: error.status,
    }
  }

  return fallback
}
