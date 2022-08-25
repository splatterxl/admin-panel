import { Snowflake } from "discord-api-types/globals"
import { PatchcordRoutes } from "../../../constants"
import http from "../../../http"
import { User } from "../../../routes/types"

export const findUserByID = async (id: Snowflake) => {
  const res = await http.get<User>(PatchcordRoutes.USER(id))

  return res.ok ? res.data : null
}
