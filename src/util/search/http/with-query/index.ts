import { _GUILDS, _hasType, _USERS } from ".."
import {
  SearchResults,
  SearchResultsType,
} from "../../../../stores/SearchResultStore"
import { SearchType } from "../../../../stores/SearchTypeStore"
import { searchGuildsByQuery } from "./guilds"
import { searchUsersByQuery } from "./user"

export const searchByQuery = async (
  input: string,
  type: SearchType,
  offset: number
): Promise<SearchResults> => {
  const users = _hasType(_USERS, type)
      ? await searchUsersByQuery(input, offset)
      : [],
    guilds = _hasType(_GUILDS, type)
      ? await searchGuildsByQuery(input, offset)
      : []

  if (users.length || guilds.length) {
    return {
      type: SearchResultsType.DONE,
      users,
      guilds,
    }
  } else {
    return { type: SearchResultsType.NONE }
  }
}
