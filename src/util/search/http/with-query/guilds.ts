import { APIGuild } from "discord-api-types/v10"
import { PatchcordRoutes } from "../../../constants"
import http from "../../../http"
import { GuildsQueryResult } from "../../../routes/types"

export const searchGuildsByQuery = async (
  input: string,
  offset = 0,
  inviteResult: APIGuild | undefined,
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

  return (inviteResult ? [inviteResult] : []).concat(res.ok ? res.data.guilds : [])
}
