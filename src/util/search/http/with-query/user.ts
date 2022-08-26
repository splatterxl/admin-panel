import { PatchcordRoutes } from "../../../constants"
import http from "../../../http"
import { UserQueryResult } from "../../../routes/types"

export const searchUsersByQuery = async (input: string, offset = 0) => {
  const res = await http.get<UserQueryResult>(PatchcordRoutes.QUERY_USERS, "", {
    query: {
      q: input.slice(0, 32),
      limit: 50,
      offset,
    },
  })

  return res.ok ? res.data.users : []
}
