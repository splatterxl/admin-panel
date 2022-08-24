import Router from "next/router"
import { SearchType } from "../../stores/SearchTypeStore"
import { Endpoints } from "../constants"

export const search = async (input: string, type: SearchType) => {
  if (!input) return

  return Router.push(Endpoints.SEARCH(input, type))
}
