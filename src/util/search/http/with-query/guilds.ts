import { PatchcordRoutes } from "../../../constants"
import http from "../../../http"
import { GuildsQueryResult } from "../../../types"

export const searchGuildsByQuery = async (input: string) => {
  const res = await http.get<GuildsQueryResult>(
    PatchcordRoutes.QUERY_GUILDS,
    "",
    {
      query: {
        q: input.slice(0, 32),
        limit: 25,
        offset: 0,
      },
    }
  )

  return res.ok ? res.data.guilds : []
}
