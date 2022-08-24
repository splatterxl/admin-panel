import { Snowflake } from "discord-api-types/globals"
import { APIUser, Routes } from "discord-api-types/v10"
import { PatchcordRoutes } from "../../../constants"
import http from "../../../http"

export const findUserByID = async (id: Snowflake) => {
  const res = await http.get<APIUser>(PatchcordRoutes.USER(id))

  return res.ok ? res.data : null
}
