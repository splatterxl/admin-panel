import { SearchResults } from "../../../stores/SearchResultStore"
import { Constants } from "../../constants"
import { searchById } from "./by-id"
import { searchByQuery } from "./with-query"

export const search = async (input: string): Promise<SearchResults> => {
  if (Constants.ID_REGEXP.test(input)) {
    return searchById(input)
  } else {
    return searchByQuery(input)
  }
}
