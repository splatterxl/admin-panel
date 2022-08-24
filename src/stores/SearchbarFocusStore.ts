import React from "react"
import Store from "./Store"

export default new (class SearchbarFocusStore extends Store<
  React.RefObject<HTMLInputElement>,
  null
> {
  constructor() {
    super(null, "SearchbarFocusStore", false)
  }
})()
