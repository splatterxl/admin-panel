import { Snowflake } from "discord-api-types/globals"
import { APIChannel, Routes } from "discord-api-types/v10"
import { PatchcordRoutes } from "../../constants"
import http from "../../http"

export const getChannel = (id: Snowflake, admin = true) => {
  return http
    .get<APIChannel>(admin ? PatchcordRoutes.CHANNEL(id) : Routes.channel(id))
    .then((res) => res.data)
}
