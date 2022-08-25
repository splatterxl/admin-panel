import { APIGuild, APIUser } from "discord-api-types/v10"

export interface UserQueryResult {
  users: User[]
  total_results: number
}

export interface GuildsQueryResult {
  guilds: APIGuild[]
  total_results: number
}

export interface User extends APIUser {
  bio: string
}
