import { Link } from "@chakra-ui/react"
import React from "react"
import SearchbarFocusStore from "../stores/SearchbarFocusStore"
import { Full } from "./layout/Full"

export const PleaseSearch: React.FC = () => {
  const ref = SearchbarFocusStore.useValue()

  React.useEffect(() => {
    ref?.current?.focus()
  }, [ref])

  return (
    <Full>
      <Link
        onClick={() => {
          ref?.current?.focus()
        }}
      >
        Input your search query above.
      </Link>
    </Full>
  )
}
