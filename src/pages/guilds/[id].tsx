import { Flex } from "@chakra-ui/react"
import { APIGuild } from "discord-api-types/v10"
import { useRouter } from "next/router"
import React from "react"
import { GuildCard } from "../../components/guilds/GuildCard"
import { FullscreenSpinner } from "../../components/layout/FullscreenSpinner"
import FocusedGuildStore from "../../stores/FocusedGuildStore"
import { PatchcordRoutes } from "../../util/constants"
import http from "../../util/http"
import { one } from "../../util/one"

export default function UserProfile() {
  const router = useRouter(),
    guildId = one(router.query.id)!,
    // undefined: loading, null: not found
    [guild, setGuild] = FocusedGuildStore.useState()

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
    <Flex
      direction={{ base: "column", md: "row" }}
      h="full"
      w="full"
      justify="flex-start"
      align={{ base: "center", md: "flex-start" }}
    >
      <GuildCard d={guild} />
      {/* <Box>Balls</Box> */}
    </Flex>
  )
}
