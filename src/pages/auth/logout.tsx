import { useRouter } from "next/router"
import React from "react"
import { FullscreenSpinner } from "../../components/layout/FullscreenSpinner"
import AuthStore from "../../stores/AuthStore"
import { Endpoints } from "../../util/constants"

export default function Logout() {
  const setAuth = AuthStore.useSetInStorage(),
    router = useRouter()

  React.useEffect(() => {
    setAuth(null)
    router.replace(Endpoints.LOGIN(Endpoints.HOME))
  }, [router, setAuth])

  return <FullscreenSpinner />
}
