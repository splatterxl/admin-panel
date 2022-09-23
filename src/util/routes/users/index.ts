import { Snowflake } from "discord-api-types/globals"
import { Routes } from "discord-api-types/v10"
import { Endpoints, PatchcordRoutes } from "../../constants"
import http from "../../http"
import { User, UserQueryResult } from "../types"

export const getAllUsers = () => {
  http.get<UserQueryResult>(PatchcordRoutes.QUERY_USERS)
}

export const getUser = <T = User>(id: Snowflake, admin = true) => {
  return http
    .get<T>(admin ? PatchcordRoutes.USER(id) : Routes.user(id))
    .then((res) => res.data)
}
