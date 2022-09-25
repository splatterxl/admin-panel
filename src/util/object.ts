export const mergeObjects = (...objs: Record<any, any>[]) => {
  return objs.reduce((acc, curr) => {
    for (const k in curr) {
      acc[k] ??= curr[k]
    }

    return acc
  }, {})
}

export const cleanup = (obj: Record<any, any>) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== undefined)
  )
}
