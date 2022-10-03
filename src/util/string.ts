export const toProperCase = (str: string) =>
  str
    .toLowerCase()
    .replace(/(afk|url|mfa)|^\w/gi, (text) => text.toUpperCase())
    .replace(/_[a-zA-Z]/g, (text) => ` ${text[1].toUpperCase()}`)
