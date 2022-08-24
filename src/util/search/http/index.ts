import SearchResultStore, {
  SearchResults,
  SearchResultsType,
} from "../../../stores/SearchResultStore"
import { Constants } from "../../constants"
import { searchById } from "./by-id"

export const search = async (input: string): Promise<SearchResults> => {
  if (Constants.ID_REGEXP.test(input)) {
    return searchById(input)
  }

  return {
    type: SearchResultsType.NONE,
    users: [],
    guilds: [],
  }
}
