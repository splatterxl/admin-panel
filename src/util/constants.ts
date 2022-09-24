import { ChakraTheme } from "@chakra-ui/react"
import { mode } from "@chakra-ui/theme-tools"
import { Snowflake } from "discord-api-types/globals"
import { SearchType } from "../stores/SearchTypeStore"

export const Endpoints = {
  LOGIN: (next = "/") => `/auth/login?next=${encodeURIComponent(next)}`,
  LOGOUT: "/auth/logout",

  SEARCH: "/search",
  DO_SEARCH: (query: string, type: SearchType) =>
    `${Endpoints.SEARCH}?q=${encodeURIComponent(query)}&t=${encodeURIComponent(
      type
    )}`,

  HOME: "/",

  AUDIT_LOG: "/audit-log",

  ARCHIVES: "/archives",

  REPORTS: "/reports",

  USERS: "/users",
  USER: (id: Snowflake) => `${Endpoints.USERS}/${id}`,

  GUILDS: "/guilds",
  GUILD: (id: Snowflake) => `${Endpoints.GUILDS}/${id}`,
  INTERNAL_SERVERS: `/guilds/internal`,

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

export const enum AbortCodes {
  MUST_LOGIN = 1e3,
}


export enum Colors {
  BG_CARD_DARK = "#52b7b7",
  BG_CARD_LIGHT = "#38bbaf",

  BG_PRIMARY_DARK = "#36393f",
  BG_PRIMARY_LIGHT = "#ffffff",
  BG_SECONDARY_DARK = "#2f3136",
  BG_SECONDARY_LIGHT = "#f2f3f5",
  BG_TERTIARY_DARK = "#282a2e",

  TEXT_INTERACTIVE_NORMAL_DARK = "white",
  TEXT_INTERACTIVE_NORMAL_LIGHT = "#4f5660",
  TEXT_HEADER_SECONDARY_DARK = "#B9BBBE",
}

const _DEFAULT_FONT =
  "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif"

export const THEME: Partial<ChakraTheme> = {
  fonts: {
    normal: '"Whitney", ' + _DEFAULT_FONT,
    heading: '"Ginto Normal", ' + _DEFAULT_FONT,
    nord: '"Ginto Nord", ' + _DEFAULT_FONT,
  },
  colors: {
    card: { dark: Colors.BG_CARD_DARK, light: Colors.BG_CARD_LIGHT },
    primary: { dark: Colors.BG_PRIMARY_DARK, light: Colors.BG_PRIMARY_LIGHT },
    secondary: {
      dark: Colors.BG_SECONDARY_DARK,
      light: Colors.BG_SECONDARY_LIGHT,
    },
    tertiary: {
      dark: Colors.BG_TERTIARY_DARK,
      light: Colors.BG_SECONDARY_LIGHT,
    },
    header_secondary: {
      dark: Colors.TEXT_HEADER_SECONDARY_DARK,
      light: Colors.TEXT_HEADER_SECONDARY_DARK,
    },
    text: {
      dark: Colors.TEXT_INTERACTIVE_NORMAL_DARK,
      light: Colors.TEXT_INTERACTIVE_NORMAL_LIGHT,
    },
  },
  styles: {
    global: (props) => ({
      body: {
        bg: mode(Colors.BG_PRIMARY_LIGHT, Colors.BG_PRIMARY_DARK)(props),
      },
    }),
  },
}

export const btnTrans = {
  _hover: {
    bgColor: "transparent",
  },
  _active: {
    bgColor: "transparent",
  },
}

type Themed<K extends string> = Record<"_light" | "_dark", Record<K, string>>

export const themed = <K extends string>(key: K, val: string): Themed<K> => ({
  _dark: { [key]: `${val}.dark` } as any,
  _light: { [key]: `${val}.light` } as any,
})

export const ErrorMessages = {
  MAZE: "The maze wasn't meant for you",
  INVALID_CREDENTIALS: "Login or password is invalid",
}

export const Constants = {
  ID_REGEXP: /^\d{16,22}/,
  DUMMY_DOMAIN: "https://admin.patchcord.pw",
  CDN_DOMAIN: process.env.NEXT_PUBLIC_CDN ?? "https://patchcord.pw",
  API_HOST:
    process.env.NEXT_PUBLIC_API_HOST ??
    process.env.NEXT_PUBLIC_API_BASE ??
    "https://patchcord.pw/api/v9",
}

export function cdn(route: string) {
  return Constants.CDN_DOMAIN + (route.startsWith("/") ? route : "/" + route)
}
