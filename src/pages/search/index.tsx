import { Spinner, Text } from "@chakra-ui/react"
import { useRouter } from "next/router"
import React from "react"
import { Full } from "../../components/layout/Full"
import { SearchUserResult } from "../../components/search/result/SearchUserResult"
import { SearchSection } from "../../components/search/SearchSection"
import SearchResultStore, {
  SearchResultsType,
} from "../../stores/SearchResultStore"
import { Endpoints } from "../../util/constants"
import { getQuery } from "../../util/query"
import { search } from "../../util/search/http"

export default function Search() {
  const [results, setResults] = SearchResultStore.useState(),
    router = useRouter(),
    { q: query } = getQuery(router.asPath)

  React.useEffect(() => {
    ;(async () => {
      if (!query) return router.replace(Endpoints.HOME)

      setResults({
        type: SearchResultsType.LOADING,
      })

      const res = await search(query)

      if (res) {
        setResults(res)
      } else {
        setResults({
          type: SearchResultsType.NONE,
        })
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps -- search being here breaks everything
  }, [query, setResults])

  console.log(query, results)

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
        <Full>
          <Text opacity={0.7}>No results were found</Text>
        </Full>
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
          {/* {results.guilds?.length ? (
            <SearchSection label="Guilds">
              {results.guilds.map((d) => (
                <SearchGuildResult d={d} key={d.id} />
              ))}
            </SearchSection>
          ) : null} */}
        </>
      )
    }
    default:
      return <>Unknown search result type</>
  }
}
