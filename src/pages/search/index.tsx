import { Center, Spinner, Text } from "@chakra-ui/react"
import { useRouter } from "next/router"
import React from "react"
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
//
// TODO: rewrite this
export default function Search(props: {
  query: string
  type: SearchType
  hideHeading?: boolean
}) {
  const [results, setResults] = SearchResultStore.useState(),
    router = useRouter()

  const {
      q: query = props.query,
      t: _type = props.type,
      o: offsetRaw,
    } = getQuery(router.asPath),
    [offset, setOffset] = React.useState(+offsetRaw)

  const type = parseInt(_type.toString())

  React.useEffect(() => {
    ;(async () => {
      if (!query && query.length !== 0) return router.replace(Endpoints.HOME)

      setResults({
        type: SearchResultsType.LOADING,
      })

      if (isNaN(offset)) {
        setOffset(0)
        return
      }

      const res = await search(query, type, offset)

      if (res) {
        setResults(res)
      } else {
        setResults({
          type: SearchResultsType.NONE,
        })
      }
    })()
  }, [query, setResults, offset, router, type])

  switch (results.type) {
    case SearchResultsType.LOADING: {
      return (
        <Center w="full" p={16}>
          <Spinner size="lg" />
        </Center>
      )
    }
    case SearchResultsType.NONE: {
      return (
        <Center w="full" p={16}>
          <Text opacity={0.7}>No results were found</Text>
        </Center>
      )
    }
    case SearchResultsType.DONE: {
      return (
        <>
          {results.users?.length ? (
            <SearchSection label={!props.hideHeading ? "Users" : null}>
              {results.users.map((d) => (
                <SearchUserResult d={d} key={d.id} />
              ))}
            </SearchSection>
          ) : null}
          {results.guilds?.length ? (
            <SearchSection label={!props.hideHeading ? "Guilds" : null}>
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
