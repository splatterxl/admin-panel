import Router, { useRouter } from "next/router"
import React from "react"
import SearchResultStore, {
  SearchResultsType,
} from "../../stores/SearchResultStore"
import { SearchType } from "../../stores/SearchTypeStore"
import { Constants, Endpoints } from "../constants"
import { getQuery } from "../query"

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
