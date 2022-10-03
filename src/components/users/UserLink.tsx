import { HStack, Text } from "@chakra-ui/react"
import { Snowflake } from "discord-api-types/globals"
import Link from "next/link"
import React from "react"
import UserCache from "../../stores/cache/UserCache"
import { Endpoints } from "../../util/constants"
import { User } from "../../util/routes/types"
import { Loading } from "../Loading"
import { UserAvatar } from "./UserAvatar"

export const UserLink: React.FC<{ id: Snowflake }> = ({ id }) => {
  const get = UserCache.useGetOrFetch()

  const [user, setUser] = React.useState<User | null>(null)

  React.useState(() => {
    if (!user) {
      get(id).then(setUser)
    }
  })

  if (!user) return <Loading size="sm" />
  else {
    return (
      <Link href={Endpoints.USER(id)} passHref>
        <HStack as="a" justify="flex-start" align="flex-start" spacing={1}>
          <UserAvatar
            id={id}
            hash={user.avatar}
            width={4}
            discriminator={parseInt(user.discriminator)}
            alt={user.username}
          />
          <Text as="span">
            {user.username}#{user.discriminator}
          </Text>
        </HStack>
      </Link>
    )
  }
}
