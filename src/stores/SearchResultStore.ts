import { APIGuild, APIUser } from "discord-api-types/v10"
import Store from "./Store"

export enum SearchResultsType {
  NONE = 0,
  LOADING,
  DONE,
}

export interface SearchResults {
  type: SearchResultsType
  users?: APIUser[]
  guilds?: APIGuild[]
}

const DEFAULT: SearchResults = {
  type: SearchResultsType.LOADING,
  users: [],
}

export default new (class SearchResultStore extends Store<SearchResults> {
  constructor() {
    super(DEFAULT, "SearchResultStore", false)
  }
})()
