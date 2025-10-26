// Custom error class for Sentry testing
class SentryExampleAPIError extends Error {
  constructor(message: string | undefined) {
    super(message)
    this.name = 'SentryExampleAPIError'
  }
}
// A faulty API route to test Sentry's error monitoring
export default function handler(
  _req: any,
  res: { status: (arg0: number) => { (): any; new (): any; json: { (arg0: { name: string }): void; new (): any } } }
) {
  throw new SentryExampleAPIError('This error is raised on the backend called by the example page.')
  res.status(200).json({ name: 'John Doe' })
}
