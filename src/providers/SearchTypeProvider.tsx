import { isNaN } from "formik"
import { useRouter } from "next/router"
import React from "react"
import SearchTypeStore, { SearchType } from "../stores/SearchTypeStore"
import { Endpoints } from "../util/constants"
import { getQuery } from "../util/query"

export const SearchTypeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [type, setType] = SearchTypeStore.useState(),
    router = useRouter()

  React.useEffect(() => {
    let newType = SearchType.ANY

    if (router.pathname.startsWith(Endpoints.GUILDS)) {
      newType = SearchType.GUILDS
    } else if (router.pathname.startsWith(Endpoints.USERS)) {
      newType = SearchType.USERS
    } else if (router.pathname === Endpoints.SEARCH) {
      const t = parseInt(getQuery(router.asPath).t)

      if (!isNaN(t)) {
        newType = t
      }
    }

    if (newType === type) return
    else setType(newType)
    // deps do not need to be exhaustive here
  }, [router.asPath, router.pathname])

  return <>{children}</>
}
