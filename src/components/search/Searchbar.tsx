import { FlexProps, Input } from "@chakra-ui/react"
import { useRouter } from "next/router"
import React from "react"
import SearchTypeStore, { SearchType } from "../../stores/SearchTypeStore"
import { getQuery } from "../../util/query"
import { search } from "../../util/search"
import FormField from "../form/field/FormField"
import SearchbarInput from "../form/field/inputs/SearchbarInput"
import Form from "../form/Form"

const PLACEHOLDERS: Record<SearchType, string> = {
  [SearchType.ANY]: "users or guilds",
  [SearchType.GUILDS]: "guilds",
  [SearchType.USERS]: "users",
}

export const Searchbar: React.FC<FlexProps & { label?: string }> = ({
  label,
  ...props
}) => {
  const searchType = SearchTypeStore.useValue(),
    router = useRouter(),
    { q: query } = getQuery(router.asPath)

  return (
    <Form
      id="search"
      width={!label ? "full" : undefined}
      customButtons
      {...props}
      onSubmit={({ input }) => search(input, searchType)}
    >
      <FormField
        id="input"
        as={SearchbarInput}
        label="Search"
        placeholder={label ?? `Search ${PLACEHOLDERS[searchType]}`}
        defaultValue={query}
        hiddenLabel
      />
      <Input type="submit" hidden />
    </Form>
  )
}
