import { Image, ResponsiveValue } from "@chakra-ui/react"
import { CDNRoutes, ImageFormat, RouteBases } from "discord-api-types/v10"
import React from "react"
import { cdn } from "../../util/constants"
import { User } from "../../util/routes/types"

export const UserAvatar: React.FC<{
  d: User
  w?: ResponsiveValue<any>
  noAlt?: boolean
}> = ({ d, w = 20, noAlt }) => {
  return (
    // eslint-disable-next-line jsx-a11y/alt-text -- noAlt usage will already be aria-hidden
    <Image
      src={
        d.avatar
          ? cdn(CDNRoutes.userAvatar(d.id, d.avatar, ImageFormat.PNG))
          : RouteBases.cdn +
            CDNRoutes.defaultUserAvatar((parseInt(d.discriminator) % 5) as any)
      }
      alt={!noAlt ? d.username : ""}
      width={w}
      borderRadius="100%"
    />
  )
}
