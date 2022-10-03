import { Heading } from "@chakra-ui/react"
import Head from "next/head"
import { useRouter } from "next/router"
import React from "react"
import { FullscreenSpinner } from "../../components/layout/FullscreenSpinner"
import { Navbar } from "../../components/layout/navbar/Navbar"
import { UserHeader } from "../../components/users/header/UserHeader"
import UserCache from "../../stores/cache/UserCache"
import FocusedUserStore from "../../stores/FocusedUserStore"
import { one } from "../../util/one"

export default function UserProfile() {
  const router = useRouter(),
    userId = one(router.query.id)!,
    // undefined: loading, null: not found
    [user, setUser] = FocusedUserStore.useState(),
    getOrFetch = UserCache.useGetOrFetch()

  React.useEffect(() => {
    ;(async () => {
      if (!userId) {
        setUser(null)
        return
      }

      if (user && user.id !== userId) setUser(null)

      try {
        // FIXME: this has a TTL of as long as the user keeps the page open, we should ideally
        // use the item in cache and update in an asynchronous operation, showing the user
        // outdated data and updating as soon as we have the new info
        //
        // maybe we should invest in a websocket connection?
        const res = await getOrFetch(userId)
        setUser(res)
      } catch {
        router.replace("/404", router.asPath)
        return
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps -- doesn't need add hook
  }, [userId])

  if (!user) return <FullscreenSpinner />

  return (
    <>
      <Head>
        <title>
          {user.username}#{user.discriminator} | Patchcord
        </title>
      </Head>
      <Navbar>
        {/* <Searchbar label="Search users by ID or name" /> */}
        <Heading size="lg" display={{ base: "none", md: "block" }}>
          User Details
        </Heading>
      </Navbar>
      <UserHeader />
    </>
  )
}
