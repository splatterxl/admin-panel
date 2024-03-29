import { Avatar } from "@chakra-ui/react"
import { CDNRoutes, ImageFormat, Snowflake } from "discord-api-types/v10"
import React from "react"
import { cdn } from "../../util/constants"

export const GuildIcon: React.FC<{
  id: Snowflake
  hash: string | null
  name: string
  size?: string
}> = (props) => {
  return (
    <Avatar
      src={
        props.hash
          ? cdn(CDNRoutes.guildIcon(props.id, props.hash, ImageFormat.PNG))
          : undefined
      }
      name={props.name}
      size={props.size}
      bgColor="gray.600"
      color="white"
      borderRadius="100%"
    />
  )
}
