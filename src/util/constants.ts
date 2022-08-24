import { Snowflake } from "discord-api-types/globals"
import { RouteBases } from "discord-api-types/v10"
import { SearchType } from "../stores/SearchTypeStore"

const encode = encodeURIComponent

export const Endpoints = {
  HOME: "/",

  LOGIN: (next = "/") => `/auth/login?next=${encode(next)}`,
  LOGOUT: "/auth/logout",

  _SEARCH: "/search",
  SEARCH: (query: string, type: SearchType) =>
    `${Endpoints._SEARCH}?q=${encode(query)}&t=${encode(type)}`,

  USERS: "/users",
  USER: (id: Snowflake) => `${Endpoints.USERS}/${id}`,

  GUILDS: "/guilds",
  GUILD: (id: Snowflake) => `${Endpoints.GUILDS}/${id}`,
}

export enum Colors {
  BG_CARD_DARK = "#52b7b7",
  BG_CARD_LIGHT = "#38bbaf",
}

export const ErrorMessages = {
  MAZE: "The maze wasn't meant for you",
  INVALID_CREDENTIALS: "Login or password is invalid",
}

export const Constants = {
  ID_REGEXP: /^\d{16,22}/,
  DUMMY_DOMAIN: "https://admin.patchcord.pw",
  CDN_DOMAIN: "https://patchcord.pw",
}

export function cdn(route: string) {
  return Constants.CDN_DOMAIN + route
}
