import { ChakraTheme } from "@chakra-ui/react"
import { Snowflake } from "discord-api-types/globals"
import { SearchType } from "../stores/SearchTypeStore"

const encode = encodeURIComponent

export const Endpoints = {
  LOGIN: (next = "/") => `/auth/login?next=${encode(next)}`,
  LOGOUT: "/auth/logout",

  _SEARCH: "/search",
  SEARCH: (query: string, type: SearchType) =>
    `${Endpoints._SEARCH}?q=${encode(query)}&t=${encode(type)}`,

  HOME: "/",

  AUDIT_LOG: "/audit-log",

  ARCHIVES: "/archives",

  REPORTS: "/reports",

  USERS: "/users",
  USER: (id: Snowflake) => `${Endpoints.USERS}/${id}`,

  GUILDS: "/guilds",
  GUILD: (id: Snowflake) => `${Endpoints.GUILDS}/${id}`,

  MESSAGES: "/messages",
  CHANNEL_MESSAGES: (channel: Snowflake) => `${Endpoints.MESSAGES}/${channel}`,

  BULK_ACTIONS: "/actions",

  EXPERIMENTS: "/experiments",
  EXPERIMENT: (id: string) => `${Endpoints.EXPERIMENTS}/${id}`,
  EXPERIMENT_EDITOR: (id: string) => `${Endpoints.EXPERIMENT(id)}/editor`,

  IP_BANS: "/bans",
  IP_BAN: (id: string) => `${Endpoints.IP_BANS}/${id}`,

  // TODO: figure out what the hell this is
  ACLS: "/acls",
}

export const PatchcordRoutes = {
  COUNTS: "/admin/counts",
  USER: (id: Snowflake) => `/admin/users/${id}`,
  GUILD: (id: Snowflake) => `/admin/guilds/${id}`,
  QUERY_USERS: "/admin/users",
  QUERY_GUILDS: "/admin/guilds",
}

export enum Colors {
  BG_CARD_DARK = "#52b7b7",
  BG_CARD_LIGHT = "#38bbaf",

  BG_PRIMARY_DARK = "#36393f",
  BG_PRIMARY_LIGHT = "#ffffff",
  BG_SECONDARY_DARK = "#2f3136",
  BG_SECONDARY_LIGHT = "#f2f3f5",

  TEXT_INTERACTIVE_NORMAL_DARK = "white",
  TEXT_INTERACTIVE_NORMAL_LIGHT = "#4f5660",
}

const _createThemeFunc =
  <L, D>(light: L, dark: D) =>
  (theme: string) =>
    theme === "light" ? light : dark

export const Theme = {
  bgCard: _createThemeFunc(Colors.BG_CARD_LIGHT, Colors.BG_CARD_DARK),
  bgPrimary: _createThemeFunc(Colors.BG_PRIMARY_LIGHT, Colors.BG_PRIMARY_DARK),
  bgSecondary: _createThemeFunc(
    Colors.BG_SECONDARY_LIGHT,
    Colors.BG_SECONDARY_DARK
  ),
}

const _DEFAULT_FONT =
  "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif"

export const THEME: Partial<ChakraTheme> = {
  fonts: {
    normal: '"Whitney", ' + _DEFAULT_FONT,
    heading: '"Ginto Normal", ' + _DEFAULT_FONT,
    nord: '"Ginto Nord", ' + _DEFAULT_FONT,
  },
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
