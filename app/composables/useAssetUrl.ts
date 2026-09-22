export function useAssetUrl(path: string) {
  const { app } = useRuntimeConfig()
  const base = app.baseURL.endsWith('/') ? app.baseURL.slice(0, -1) : app.baseURL
  return `${base}${path}`
}
