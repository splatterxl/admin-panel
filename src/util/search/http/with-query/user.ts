import { PatchcordRoutes } from "../../../constants"
import http from "../../../http"
import { UserQueryResult } from "../../../routes/types"

export const searchUsersByQuery = async (
  input: string,
  offset = 0,
  lowLimit?: boolean
) => {
  const res = await http.get<UserQueryResult>(PatchcordRoutes.QUERY_USERS, "", {
    query: {
      q: input.slice(0, 32),
      limit: lowLimit ? 20 : 50,
      offset,
    },
  })

  return res.ok ? res.data.users : []
}
