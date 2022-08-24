import { Snowflake } from "discord-api-types/globals"
import { APIUser, Routes } from "discord-api-types/v10"
import http from "../../../http"

export const findUserByID = async (id: Snowflake) => {
  const res = await http.get<APIUser>(Routes.user(id))

  return res.data
}
