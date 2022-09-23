import {
  RESTGetAPICurrentUserGuildsResult,
  Routes,
} from "discord-api-types/v10"
import React from "react"
import { FullscreenSpinner } from "../components/layout/FullscreenSpinner"
import CurrentUserGuildsStore from "../stores/CurrentUserGuildsStore"
import http from "../util/http"

export const PersistentStoreProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [loaded, setLoaded] = React.useState(false),
    [set] = [CurrentUserGuildsStore.useSetInStorage()]

  React.useEffect(() => {
    ;(async () => {
      if (loaded) return

      await CurrentUserGuildsStore.fetch(set)

      setLoaded(true)
    })()
  }, [loaded])

  if (!loaded) return <FullscreenSpinner />
  else return <>{children}</>
}
