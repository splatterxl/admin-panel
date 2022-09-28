import {
  SearchResults,
  SearchResultsType,
} from "../../../../stores/SearchResultStore"
import { getGuild } from "../../../routes/guilds"
import { getInvite } from "../../../routes/guilds/invites"
import { redirectToSearchResult } from "../by-id"

export const searchByInvite = async (
  query: string,
  redirect = false
): Promise<SearchResults> => {
  try {
    const invite = await getInvite(query)

    const guild = await getGuild(invite.guild!.id, true)

    if (redirect) {
      redirectToSearchResult("guilds", guild.id, guild)

      return { type: SearchResultsType.LOADING }
    } else {
      return { type: SearchResultsType.DONE, guilds: [guild] }
    }
  } catch (e) {
    return {
      type: SearchResultsType.NONE,
    }
  }
}
