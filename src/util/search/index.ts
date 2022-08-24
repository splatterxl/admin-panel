import Router from "next/router"
import SearchResultStore, {
  SearchResultsType,
} from "../../stores/SearchResultStore"
import { SearchType } from "../../stores/SearchTypeStore"
import { Endpoints } from "../constants"

export const search = async (input: string, type: SearchType) => {
  if (!input) return

  return Router.push(Endpoints.SEARCH(input, type))
}

export const useSearch = () => {
  const setResults = SearchResultStore.useSetState()

  return (input: string, type: SearchType) => {
    setResults({
      type: SearchResultsType.LOADING,
    })
    return search(input, type)
  }
}
