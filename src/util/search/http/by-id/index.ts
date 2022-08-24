import { Snowflake } from "discord-api-types/globals"
import Router from "next/router"
import {
  SearchResults,
  SearchResultsType,
} from "../../../../stores/SearchResultStore"
import { findGuildByID } from "./guild"
import { findUserByID } from "./user"

export const searchById = async (input: Snowflake): Promise<SearchResults> => {
  // do user search first
  const user = await findUserByID(input)

  if (user) return redirectToSearchResult("users", input, user)

  // guilds search if no user is found
  const guild = await findGuildByID(input)

  if (guild) return redirectToSearchResult("guilds", input, guild)

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
  // Router.replace(`/${type}/${id}`)

  return {
    type: SearchResultsType.DONE,
    [type]: [data],
  }
}
