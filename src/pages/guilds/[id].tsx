import { Heading } from "@chakra-ui/react"
import { APIGuild } from "discord-api-types/v10"
import { useRouter } from "next/router"
import React, { createContext } from "react"
import { GuildHeader } from "../../components/guilds/header/GuildHeader"
import { FullscreenSpinner } from "../../components/layout/FullscreenSpinner"
import { Navbar } from "../../components/layout/navbar/Navbar"
import { PatchcordRoutes } from "../../util/constants"
import http from "../../util/http"
import { one } from "../../util/one"

export const GuildContext = createContext<{
  data: APIGuild & { member_count: number }
  setData: React.Dispatch<APIGuild & { member_count: number }>
}>(null as any)

export default function UserProfile() {
  const router = useRouter(),
    guildId = one(router.query.id)!,
    // undefined: loading, null: not found
    [guild, setGuild] = React.useState<null | undefined | APIGuild>(undefined)

  React.useEffect(() => {
    ;(async () => {
      if (!guildId) {
        setGuild(null)
        return
      }

      if (guild && guild.id !== guildId) setGuild(null)

      const res = await http.get<APIGuild>(PatchcordRoutes.GUILD(guildId))

      if (!res.ok) {
        router.replace("/404", router.asPath)
        return
      }

      setGuild(res.data)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps -- doesn't need add hook
  }, [guildId])

  if (!guild) return <FullscreenSpinner />

  return (
    <>
      <Navbar>
        {/* <Searchbar label="Search guilds by ID or name" /> */}
        <Heading size="md" display={{ base: "none", md: "block" }}>
          Guild Details
        </Heading>
      </Navbar>
      <GuildContext.Provider
        value={{
          data: guild as any,
          setData: (data) => {
            console.log("new guild", data)
            setGuild(data)
          },
        }}
      >
        <GuildHeader />
      </GuildContext.Provider>
    </>
  )
}
