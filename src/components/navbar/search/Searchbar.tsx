import { Input } from "@chakra-ui/react"
import { useRouter } from "next/router"
import React from "react"
import SearchbarFocusStore from "../../../stores/SearchbarFocusStore"
import SearchResultStore from "../../../stores/SearchResultStore"
import SearchTypeStore, { SearchType } from "../../../stores/SearchTypeStore"
import { getQuery } from "../../../util/query"
import { search } from "../../../util/search"
import FormField from "../../form/field/FormField"
import SearchbarInput from "../../form/field/inputs/SearchbarInput"
import Form from "../../form/Form"

const PLACEHOLDERS: Record<SearchType, string> = {
  [SearchType.ANY]: "users or guilds",
  [SearchType.GUILDS]: "guilds",
  [SearchType.USERS]: "users",
}

export const Searchbar: React.FC = () => {
  const searchType = SearchTypeStore.useValue(),
    setRef = SearchbarFocusStore.useSetState(),
    setSearchResults = SearchResultStore.useSetState(),
    ref = React.useRef<HTMLInputElement>(null),
    router = useRouter(),
    { q: query } = getQuery(router.asPath)

  React.useEffect(() => {
    setRef(ref)
    // eslint-disable-next-line react-hooks/exhaustive-deps -- no deps needed here
  }, [])

  return (
    <Form
      id="search"
      customButtons
      useFlex={false}
      onSubmit={({ input }) => search(input, searchType)}
    >
      <FormField
        id="input"
        as={SearchbarInput}
        label="Search"
        placeholder={`Search ${PLACEHOLDERS[searchType]}`}
        defaultValue={query}
        hiddenLabel
        inputProps={{
          inputRef: ref,
        }}
      />
      <Input type="submit" hidden />
    </Form>
  )
}
