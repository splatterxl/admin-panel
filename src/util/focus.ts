import React from "react"
import SearchbarFocusStore from "../stores/SearchbarFocusStore"

export const useSearchbarFocus = () => {
  const ref = SearchbarFocusStore.useValue()

  React.useEffect(() => {
    ref?.current?.focus()
  }, [ref])
}
