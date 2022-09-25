export const toProperCase = (str: string) =>
  str
    .replace(/(afk|url|mfa)|^\w/gi, (text) => text.toUpperCase())
    .replace(/_/g, " ")
