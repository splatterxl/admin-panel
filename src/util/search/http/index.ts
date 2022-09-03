import { SearchResults } from "../../../stores/SearchResultStore"
import { SearchType } from "../../../stores/SearchTypeStore"
import { Constants } from "../../constants"
import { searchById } from "./by-id"
import { searchByQuery } from "./with-query"

export const search = async (
  query: string,
  type: SearchType,
  offset: number,
  shouldTruncate?: boolean
): Promise<SearchResults> => {
  if (Constants.ID_REGEXP.test(query)) {
    return searchById(query, type)
  } else {
    return searchByQuery(query, type, offset, shouldTruncate)
  }
}

export function _hasType(types: SearchType[], type: SearchType) {
  return types.includes(type)
}

export const _GUILDS = [SearchType.ANY, SearchType.GUILDS],
  _USERS = [SearchType.ANY, SearchType.USERS]
