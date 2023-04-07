import proxy from "./proxy.d"

export const proxyReplace = (url?: string) => {
  if (import.meta.env.VITE_NODE_ENV === "development") return url

  for (const item of Object.keys(proxy)) {
    const reg = new RegExp(item)
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    if (reg.test(url!)) {
      return url?.replace(reg, import.meta.env.VITE_BASE_API)
    }
  }
  return url
}
