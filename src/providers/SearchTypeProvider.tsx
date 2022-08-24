import { isNaN } from "formik"
import { useRouter } from "next/router"
import React from "react"
import SearchTypeStore, { SearchType } from "../stores/SearchTypeStore"
import { Endpoints } from "../util/constants"
import { one } from "../util/one"
import { getQuery } from "../util/query"

export const SearchTypeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [type, setType] = SearchTypeStore.useState(),
    router = useRouter()

  React.useEffect(() => {
    let newType = SearchType.ANY

    switch (router.pathname) {
      case Endpoints.GUILDS: {
        newType = SearchType.GUILDS
        break
      }
      case Endpoints.USERS: {
        newType = SearchType.USERS
        break
      }
      case Endpoints._SEARCH: {
        const t = parseInt(getQuery(router.asPath).t)

        if (!isNaN(t)) {
          newType = t
          break
        }
      }
    }

    if (newType === type) return
    else setType(newType)
    // deps do not need to be exhaustive here
  }, [router.asPath, router.pathname])

  return <>{children}</>
}
