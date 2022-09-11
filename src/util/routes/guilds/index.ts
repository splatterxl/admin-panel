import { Snowflake } from "discord-api-types/globals"
import { APIGuild, Routes } from "discord-api-types/v10"
import { PatchcordRoutes } from "../../constants"
import http from "../../http"

export const getGuildsBulk = ({
  ids,
  admin,
}: {
  ids: Snowflake[]
  admin: boolean
}) => {
  return Promise.all(ids.map((id) => getGuild(id, admin)))
}

export const getGuild = (id: Snowflake, admin = false) =>
  http
    .get<APIGuild>(admin ? PatchcordRoutes.GUILD(id) : Routes.guild(id))
    .then((v) => v.data)
