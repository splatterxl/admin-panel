import { SearchResults } from "../../../stores/SearchResultStore"
import { SearchType } from "../../../stores/SearchTypeStore"
import { Constants } from "../../constants"
import { searchById } from "./by-id"
import { searchByInvite } from "./by-invite"
import { searchByQuery } from "./with-query"

export const search = async (
  query: string,
  type: SearchType,
  offset: number,
  shouldTruncate = true
): Promise<SearchResults> => {
  if (Constants.ID_REGEXP.test(query)) {
    return searchById(query, type)
  } else {
    const invite = Constants.INVITE_REGEXP.exec(query)

    if (invite) {
      return searchByInvite(invite!.groups!.invite)
    } else {
      const inviteResults = await searchByInvite(query)

      return searchByQuery(query, type, offset, shouldTruncate, inviteResults)
    }
  }
}

export function _hasType(types: SearchType[], type: SearchType) {
  return types.includes(type)
}

export const _GUILDS = [SearchType.ANY, SearchType.GUILDS],
  _USERS = [SearchType.ANY, SearchType.USERS]
