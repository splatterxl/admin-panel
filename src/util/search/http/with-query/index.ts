import {
  SearchResults,
  SearchResultsType,
} from "../../../../stores/SearchResultStore"
import { searchGuildsByQuery } from "./guilds"
import { searchUsersByQuery } from "./user"

export const searchByQuery = async (input: string): Promise<SearchResults> => {
  const users = await searchUsersByQuery(input),
    guilds = await searchGuildsByQuery(input)

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
