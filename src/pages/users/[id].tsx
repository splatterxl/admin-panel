import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { FullscreenSpinner } from "../../components/layout/FullscreenSpinner";
import FocusedUserStore from "../../stores/FocusedUserStore";
import { PatchcordRoutes } from "../../util/constants";
import http from "../../util/http";
import { one } from "../../util/one";
import { User } from "../../util/routes/types";

export default function UserProfile() {
  const router = useRouter(),
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
        router.replace("/404", router.asPath)
        return
      }

      setUser(res.data)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps -- doesn't need add hook
  }, [userId])

  if (!user) return <FullscreenSpinner />

  return (
    <>
      <Head>
        <title>{user.username} on Patchcord</title>
      </Head>
      <UserHead
    </>
  )
}
