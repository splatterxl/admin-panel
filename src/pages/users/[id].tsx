import { Flex } from "@chakra-ui/react"
import { useRouter } from "next/router"
import React from "react"
import { FullscreenSpinner } from "../../components/layout/FullscreenSpinner"
import { UserCard } from "../../components/user/UserCard"
import FocusedUserStore from "../../stores/FocusedUserStore"
import { RecentlyViewedUsersStore } from "../../stores/RecentlyViewedStore"
import { Endpoints, PatchcordRoutes } from "../../util/constants"
import http from "../../util/http"
import { one } from "../../util/one"
import { User } from "../../util/routes/types"

export default function UserProfile() {
  const addRecentlyViewedUser = RecentlyViewedUsersStore.useAdd(),
    router = useRouter(),
    userId = one(router.query.id)!,
    // undefined: loading, null: not found
    [user, setUser] = FocusedUserStore.useState()

  React.useEffect(() => {
    ;(async () => {
      if (!userId) {
        setUser(null)
        return
      }

      if (user && user.id !== userId) setUser(null)

      const res = await http.get<User>(PatchcordRoutes.USER(userId))

      if (!res.ok) {
        router.replace(Endpoints.USER_NOT_FOUND, router.asPath)
        return
      }

      addRecentlyViewedUser(res.data)
      setUser(res.data)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps -- doesn't need add hook
  }, [userId])

  if (!user) return <FullscreenSpinner />

  return (
    <Flex
      direction="row"
      h="full"
      w="full"
      justify="flex-start"
      align="flex-start"
    >
      <UserCard d={user} />
      {/* <Box>Balls</Box> */}
    </Flex>
  )
}
