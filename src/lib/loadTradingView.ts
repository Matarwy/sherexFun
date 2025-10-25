// src/lib/loadTradingView.ts
let loadingPromise: Promise<void> | null = null

export function loadTradingView(basePath = ''): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve()

  // already present
  if ((window as any).TradingView) return Promise.resolve()

  // already loading
  if (loadingPromise) return loadingPromise

  loadingPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script')
    // respect basePath/assetPrefix if you use them
    const base = basePath || (process.env.NEXT_PUBLIC_BASE_PATH ?? '')
    script.src = `${base}/charting_library/charting_library.js`
    script.async = true
    script.onload = () => resolve()
    script.onerror = (e) => reject(new Error('Failed to load charting_library.js'))
    document.body.appendChild(script)
  })

  return loadingPromise
}
