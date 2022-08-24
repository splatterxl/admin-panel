import { Snowflake } from "discord-api-types/globals"
import { APIGuild, Routes } from "discord-api-types/v10"
import http from "../../../http"

export const findGuildByID = async (id: Snowflake) => {
  const res = await http.get<APIGuild>(Routes.guild(id))

  return res.ok ? res.data : null
}
