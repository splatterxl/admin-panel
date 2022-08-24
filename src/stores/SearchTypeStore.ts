import Store from "./Store"

export enum SearchType {
  ANY = 0,
  USERS,
  GUILDS,
}

export default new (class SearchTypeStore extends Store<SearchType> {
  constructor() {
    super(SearchType.ANY, "SearchTypeStore", false)
  }
})()
