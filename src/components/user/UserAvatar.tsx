import { Image } from "@chakra-ui/react"
import { CDNRoutes, ImageFormat, RouteBases } from "discord-api-types/v10"
import React from "react"
import { cdn } from "../../util/constants"
import { User } from "../../util/routes/types"

export const UserAvatar: React.FC<{ d: User; w?: number }> = ({
  d,
  w = 20,
}) => {
  return (
    <Image
      src={
        d.avatar
          ? cdn(CDNRoutes.userAvatar(d.id, d.avatar, ImageFormat.PNG))
          : RouteBases.cdn +
            CDNRoutes.defaultUserAvatar((parseInt(d.discriminator) % 5) as any)
      }
      alt={d.username}
      width={w}
      borderRadius="100%"
    />
  )
}
