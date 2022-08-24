import { Box, Flex } from "@chakra-ui/react"
import { APIUser } from "discord-api-types/v10"
import { useRouter } from "next/router"
import React from "react"
import { FullscreenSpinner } from "../../components/layout/FullscreenSpinner"
import { UserCard } from "../../components/user/UserCard"
import { RecentlyViewedUsersStore } from "../../stores/RecentlyViewedStore"
import { Endpoints, PatchcordRoutes } from "../../util/constants"
import http from "../../util/http"
import { one } from "../../util/one"

export default function UserProfile() {
  const addRecentlyViewedUser = RecentlyViewedUsersStore.useAdd(),
    router = useRouter(),
    userId = one(router.query.id)!,
    // undefined: loading, null: not found
    [user, setUser] = React.useState<null | undefined | APIUser>(undefined)

  React.useEffect(() => {
    ;(async () => {
      if (!userId) {
        setUser(null)
        return
      }

      const res = await http.get<APIUser>(PatchcordRoutes.USER(userId))

      if (!res.ok) {
        router.replace(Endpoints.USER_NOT_FOUND, router.asPath)
        return
      }

      addRecentlyViewedUser(res.data)
      setUser(res.data)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps -- doesn't need add hook
  }, [userId])

  console.log(user)

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
