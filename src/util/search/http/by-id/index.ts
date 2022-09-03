import { Snowflake } from "discord-api-types/globals"
import Router from "next/router"
import { _GUILDS, _hasType, _USERS } from ".."
import {
  SearchResults,
  SearchResultsType,
} from "../../../../stores/SearchResultStore"
import { SearchType } from "../../../../stores/SearchTypeStore"
import { findGuildByID } from "./guild"
import { findUserByID } from "./user"

export const searchById = async (
  query: Snowflake,
  type: SearchType
): Promise<SearchResults> => {
  // do user search first
  const user = _hasType(_USERS, type) && (await findUserByID(query))

  if (user) return redirectToSearchResult("users", query, user)

  // guilds search if no user is found
  const guild = _hasType(_GUILDS, type) && (await findGuildByID(query))

  if (guild) return redirectToSearchResult("guilds", query, guild)

  return {
    type: SearchResultsType.NONE,
    users: [],
  }
}

export const redirectToSearchResult = (
  type: string,
  id: Snowflake,
  data: any
): SearchResults => {
  Router.replace(`/${type}/${id}`)

  return {
    type: SearchResultsType.LOADING,
    [type]: [data],
  }
}
