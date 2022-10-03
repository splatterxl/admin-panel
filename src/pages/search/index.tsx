import { VStack } from "@chakra-ui/react"
import Head from "next/head"
import { useRouter } from "next/router"
import React from "react"
import { Navbar } from "../../components/layout/navbar/Navbar"
import { SearchResults } from "../../components/search/result/SearchResults"
import { Searchbar } from "../../components/search/Searchbar"
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
      q: query = props.query ?? "",
      t: _type = props.type ?? SearchType.ANY,
      o: offsetRaw,
    } = getQuery(router.asPath),
    [offset, setOffset] = React.useState(+offsetRaw)

  const type = parseInt(_type.toString())

  React.useEffect(() => {
    ;(async () => {
      if (!query && query !== "") return

      setResults({
        type: SearchResultsType.LOADING,
      })

      if (isNaN(offset)) {
        setOffset(0)
        return
      }

      const res = await search(query, type, offset, type === SearchType.ANY)

      if (res) {
        setResults(res)
      } else {
        setResults({
          type: SearchResultsType.NONE,
        })
      }
    })()
  }, [query, setResults, offset, router, type])

  const isPath = router.pathname === Endpoints.SEARCH

  return (
    <>
      <Head>
        <title>
          Search
          {type !== SearchType.ANY
            ? " " + SearchType[type].toLowerCase()
            : null}{" "}
          | Patchcord
        </title>
      </Head>
      <VStack spacing={3} width="full" pt={!isPath ? 3 : 0}>
        {isPath ? (
          <Navbar isSearch>
            <Searchbar />
          </Navbar>
        ) : (
          <Searchbar />
        )}
        <SearchResults {...results} hideHeading={props.hideHeading} />
      </VStack>
    </>
  )
}
