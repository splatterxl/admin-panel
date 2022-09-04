import { Image, ResponsiveValue } from "@chakra-ui/react"
import {
  CDNRoutes,
  DefaultUserAvatarAssets,
  ImageFormat,
  RouteBases,
  Snowflake,
} from "discord-api-types/v10"
import React from "react"
import { cdn } from "../../util/constants"

export const UserAvatar: React.FC<{
  id: Snowflake
  hash?: string | null
  discriminator?: number
  width?: ResponsiveValue<any>
  alt: string
}> = (props) => {
  return (
    // eslint-disable-next-line jsx-a11y/alt-text -- noAlt usage will already be aria-hidden
    <Image
      src={
        props.hash
          ? cdn(CDNRoutes.userAvatar(props.id, props.hash, ImageFormat.PNG))
          : RouteBases.cdn +
            CDNRoutes.defaultUserAvatar(
              // i hate discord-api-types
              ((props.discriminator ?? 0) % 5) as DefaultUserAvatarAssets
            )
      }
      alt={props.alt}
      width={props.width}
      borderRadius="100%"
    />
  )
}
