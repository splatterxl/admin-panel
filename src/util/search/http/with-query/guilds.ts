import { PatchcordRoutes } from "../../../constants"
import http from "../../../http"
import { GuildsQueryResult } from "../../../routes/types"

export const searchGuildsByQuery = async (
  input: string,
  offset = 0,
  lowLimit?: boolean
) => {
  const res = await http.get<GuildsQueryResult>(
    PatchcordRoutes.QUERY_GUILDS,
    "",
    {
      query: {
        q: input.slice(0, 32),
        limit: lowLimit ? 20 : 50,
        offset,
      },
    }
  )

  return res.ok ? res.data.guilds : []
}
