import {
  RESTGetAPICurrentUserGuildsResult,
  Routes,
} from "discord-api-types/v10"
import React from "react"
import CurrentUserGuildsStore from "../stores/CurrentUserGuildsStore"
import http from "../util/http"

export const PersistentStoreProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [loaded, setLoaded] = React.useState(false),
    [setCurrentUserGuilds] = [CurrentUserGuildsStore.useSetState()]

  React.useEffect(() => {
    {
      // current user guilds

      http
        .get<RESTGetAPICurrentUserGuildsResult>(Routes.userGuilds())
        .then(({ ok, data }) => {
          if (ok) setCurrentUserGuilds(data)
        })
    }

    setLoaded(true)
  }, [])

  if (!loaded) return null
  else return <>{children}</>
}
