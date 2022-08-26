import { SearchResults } from "../../../stores/SearchResultStore"
import { SearchType } from "../../../stores/SearchTypeStore"
import { Constants } from "../../constants"
import { searchById } from "./by-id"
import { searchByQuery } from "./with-query"

export const search = async (
  input: string,
  type: SearchType,
  offset: number
): Promise<SearchResults> => {
  if (Constants.ID_REGEXP.test(input)) {
    return searchById(input, type)
  } else {
    return searchByQuery(input, type, offset)
  }
}

export function _hasType(types: SearchType[], type: SearchType) {
  return types.includes(type)
}

export const _GUILDS = [SearchType.ANY, SearchType.GUILDS],
  _USERS = [SearchType.ANY, SearchType.USERS]
