import { PatchcordRoutes } from "../../constants"
import http from "../../http"
import { UserQueryResult } from "../types"

export const getAllUsers = () => {
  http.get<UserQueryResult>(PatchcordRoutes.QUERY_USERS)
}
