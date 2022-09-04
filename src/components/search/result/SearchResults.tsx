import { Center, Spinner, Text } from "@chakra-ui/react"
import React from "react"
import {
  SearchResults as ISearchResults,
  SearchResultsType,
} from "../../../stores/SearchResultStore"
import { SearchSection } from "../SearchSection"
import { SearchGuildResult } from "./SearchGuildResult"
import { SearchUserResult } from "./SearchUserResult"

export const SearchResults: React.FC<
  ISearchResults & { hideHeading?: boolean }
> = ({ hideHeading, ...results }) => {
  switch (results.type) {
    case SearchResultsType.LOADING: {
      return (
        <Center width="full" p={16}>
          <Spinner size="lg" />
        </Center>
      )
    }
    case SearchResultsType.NONE: {
      return (
        <Center width="full" p={16}>
          <Text opacity={0.7}>No results were found</Text>
        </Center>
      )
    }
    case SearchResultsType.DONE: {
      return (
        <>
          {results.users?.length ? (
            <SearchSection label={!hideHeading ? "Users" : null}>
              {results.users.map((d) => (
                <SearchUserResult d={d} key={d.id} />
              ))}
            </SearchSection>
          ) : null}
          {results.guilds?.length ? (
            <SearchSection label={!hideHeading ? "Guilds" : null}>
              {results.guilds.map((d) => (
                <SearchGuildResult d={d} key={d.id} />
              ))}
            </SearchSection>
          ) : null}
        </>
      )
    }
    default:
      return <>Unknown search result type</>
  }
}
