export const Endpoints = {
  HOME: "/",

  LOGIN: (next = "/") => `/auth/login?next=${next}`,
}

export enum Colors {
  BG_CARD_DARK = "#52b7b7",
  BG_CARD_LIGHT = "#38bbaf",
}

export const ErrorMessages = {
  MAZE: "The maze wasn't meant for you",
  INVALID_CREDENTIALS: "Login or password is invalid",
}
