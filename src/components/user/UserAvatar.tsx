import { Image } from "@chakra-ui/react"
import { APIUser, CDNRoutes, RouteBases } from "discord-api-types/v10"
import React from "react"

export const UserAvatar: React.FC<{ d: APIUser }> = ({ d }) => {
  return (
    <Image
      src={
        // d.avatar
        //   ? cdn(CDNRoutes.userAvatar(d.id, d.avatar, ImageFormat.PNG))
        //   :
        RouteBases.cdn +
        CDNRoutes.defaultUserAvatar((parseInt(d.discriminator) % 5) as any)
      }
      alt={d.username}
      width={20}
      borderRadius="100%"
    />
  )
}
