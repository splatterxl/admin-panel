import { Constants } from "./constants"

export const getQuery = (asPath: string) => {
  try {
    const url = new URL(asPath, Constants.DUMMY_DOMAIN),
      obj: Record<string, string> = {}

    for (const [k, v] of url.searchParams.entries()) {
      obj[k] = v
    }

    return obj
  } catch {
    return {}
  }
}
