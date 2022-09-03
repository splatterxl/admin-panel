import { Avatar } from "@chakra-ui/react"
import { APIGuild, CDNRoutes, ImageFormat } from "discord-api-types/v10"
import React from "react"
import { cdn } from "../../util/constants"

export const GuildIcon: React.FC<{ d: APIGuild; w?: number }> = ({ d, w }) => {
  return (
    <Avatar
      src={
        d.icon
          ? cdn(CDNRoutes.guildIcon(d.id, d.icon!, ImageFormat.PNG))
          : undefined
      }
      name={d.name}
      width={20}
      height={20}
      bgColor="gray.600"
      color="white"
      borderRadius="100%"
    />
  )
}
