import { Routes, Snowflake } from "discord-api-types/v10"
import http from "../../http"

export const acceptInvite = async (code: string) => {
  await http.post(Routes.invite(code))
}

export const joinGuild = async (guildId: Snowflake, userId: Snowflake) => {
  await http.put(Routes.guildMember(guildId), "")
}
