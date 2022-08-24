import { Snowflake } from "discord-api-types/globals"
import { APIGuild, Routes } from "discord-api-types/v10"
import { PatchcordRoutes } from "../../../constants"
import http from "../../../http"

export const findGuildByID = async (id: Snowflake) => {
  const res = await http.get<APIGuild>(PatchcordRoutes.GUILD(id))

  return res.ok ? res.data : null
}
