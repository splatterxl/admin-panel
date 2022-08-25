import { HStack, Spinner } from "@chakra-ui/react"
import React, { useState } from "react"
import { Endpoints, PatchcordRoutes } from "../../../util/constants"
import http from "../../../util/http"
import { Counter } from "./Counter"

interface Counts {
  users: number
  guilds: number
  channels: number
  messages: number
}

export const Counts: React.FC = () => {
  const [counts, setCounts] = useState<Counts | null>(null)

  React.useEffect(() => {
    ;(async () => {
      if (counts) return

      const { data } = await http.get<Counts>(PatchcordRoutes.COUNTS)

      setCounts(data)
    })()
  }, [counts])

  if (!counts) {
    return (
      <HStack pt={12} w={{base:"full",md:"40%"}} justify="center">
        <Spinner size="lg" />
      </HStack>
    )
  }

  return (
    <HStack flexWrap="wrap" py={4} align="center" justify="center" spacing={0} gap={1}>
      <Counter label="Users" value={counts.users} href={Endpoints.USERS} />
      <Counter label="Guilds" value={counts.guilds} href={Endpoints.GUILDS} />
      <Counter label="Channels" value={counts.channels} />
      <Counter label="Messages" value={counts.messages} />
    </HStack>
  )
}
