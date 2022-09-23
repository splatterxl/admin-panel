import { Routes, Snowflake } from "discord-api-types/v10"
import CurrentUserGuildsStore from "../../../stores/CurrentUserGuildsStore"
import http from "../../http"

export const acceptInvite = async (code: string) => {
  await http.post(Routes.invite(code))
}

export const joinGuild = async (
  guildId: Snowflake,
  userId: Snowflake,
  set?: ReturnType<typeof CurrentUserGuildsStore["useSetInStorage"]>
) => {
  await http.put(Routes.guildMember(guildId, userId), "")

  if (set) await CurrentUserGuildsStore.fetch(set)
}

export const useJoinGuild = () => {
  const set = CurrentUserGuildsStore.useSetInStorage()

  return (guildId: Snowflake, userId: Snowflake) =>
    joinGuild(guildId, userId, set)
}
