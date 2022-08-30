import { Spinner, Text } from "@chakra-ui/react"
import { useRouter } from "next/router"
import React from "react"
import { Full } from "../../components/layout/Full"
import { SearchGuildResult } from "../../components/search/result/SearchGuildResult"
import { SearchUserResult } from "../../components/search/result/SearchUserResult"
import { SearchSection } from "../../components/search/SearchSection"
import SearchResultStore, {
  SearchResultsType,
} from "../../stores/SearchResultStore"
import { SearchType } from "../../stores/SearchTypeStore"
import { Endpoints } from "../../util/constants"
import { getQuery } from "../../util/query"
import { search } from "../../util/search/http"

// NOTE(lexisother): No, this isn't exactly a desirable way to do things.
// The Search component can be overriden to search for all items by providing
//   it with `"", "<int>"` as its arguments. Please, for the love of god,
//   REWRITE THIS!!!
export default function Search(manualQuery?: string, manualType?: string) {
  const [results, setResults] = SearchResultStore.useState(),
    router = useRouter()
  let {
    q: query,
    t: type,
    "search-input": legacyInput,
    o: offsetRaw,
  } = getQuery(router.asPath)
  const [offset, setOffset] = React.useState(+offsetRaw)

  query = query ?? manualQuery
  type = type ?? manualType

  React.useEffect(() => {
    ;(async () => {
      if (!query && query.length !== 0) return router.replace(Endpoints.HOME)

      setResults({
        type: SearchResultsType.LOADING,
      })

      let offsetValue = offset

      if (isNaN(offsetValue)) {
        setOffset(0)
        return
      }

      const res = await search(
        query ?? legacyInput,
        type ? parseInt(type) : SearchType.ANY,
        +offset
      )

      if (res) {
        setResults(res)
      } else {
        setResults({
          type: SearchResultsType.NONE,
        })
      }
    })()
  }, [query, manualQuery, setResults, offset, legacyInput, router, type])

  switch (results.type) {
    case SearchResultsType.LOADING: {
      return (
        <Full>
          <Spinner size="lg" />
        </Full>
      )
    }
    case SearchResultsType.NONE: {
      return (
        <>
          <Full>
            <Text opacity={0.7}>No results were found</Text>
          </Full>
        </>
      )
    }
    case SearchResultsType.DONE: {
      return (
        <>
          {results.users?.length ? (
            <SearchSection label="Users">
              {results.users.map((d) => (
                <SearchUserResult d={d} key={d.id} />
              ))}
            </SearchSection>
          ) : null}
          {results.guilds?.length ? (
            <SearchSection label="Guilds">
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
