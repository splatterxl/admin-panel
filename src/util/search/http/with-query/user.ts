import { PatchcordRoutes } from "../../../constants"
import http from "../../../http"
import { UserQueryResult } from "../../../types"

export const searchUsersByQuery = async (input: string) => {
  const res = await http.get<UserQueryResult>(PatchcordRoutes.QUERY_USERS, "", {
    query: {
      q: input.slice(0, 32),
      limit: 25,
      offset: 0,
    },
  })

  return res.ok ? res.data.users : []
}
