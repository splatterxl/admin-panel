import { APIUser, Routes } from "discord-api-types/v10"
import { useRouter } from "next/router"
import React from "react"
import { FullscreenSpinner } from "../components/layout/FullscreenSpinner"
import AuthStore from "../stores/AuthStore"
import CurrentUserStore from "../stores/CurrentUserStore"
import { Endpoints } from "../util/constants"
import http from "../util/http"

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [getToken, _, token] = AuthStore.useStateFromStorage(),
    [, setCurrentUser, currentUser] = CurrentUserStore.useStateFromStorage(),
    router = useRouter(),
    isLogin = router.pathname === "/auth/login"

  React.useEffect(() => {
    ;(async () => {
      if (isLogin) return

      const token = getToken()

      if (!token) {
        router.replace(Endpoints.LOGIN(router.asPath))
      } else if (!currentUser) {
        const { data } = await http.get<APIUser>(Routes.user())

        setCurrentUser(data)
      }
    })()
  }, [])

  if (!isLogin && !token && !currentUser) {
    return <FullscreenSpinner />
  } else {
    return <>{children}</>
  }
}
