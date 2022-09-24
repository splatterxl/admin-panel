import { useRouter } from "next/router"
import React from "react"
import { FullscreenSpinner } from "../components/layout/FullscreenSpinner"
import CurrentUserGuildsStore from "../stores/CurrentUserGuildsStore"
import { AbortCodes, Endpoints } from "../util/constants"
import { clearAuthAndGoToLogin } from "./AuthProvider"

export const PersistentStoreProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [loaded, setLoaded] = React.useState(false),
    [set] = [CurrentUserGuildsStore.useSetInStorage()],
    router = useRouter()

  React.useEffect(() => {
    ;(async () => {
      if (loaded) return

      try {
        await CurrentUserGuildsStore.fetch(set)

        setLoaded(true)
      } catch (e) {
        if (e === AbortCodes.MUST_LOGIN) {
          setLoaded(true)
        } else {
          console.error("failed to run loaders for persistent stores", e)
        }
      }
    })()
  }, [loaded, router, set])

  if (!loaded) return <FullscreenSpinner />
  else return <>{children}</>
}
