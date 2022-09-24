import { HStack, Spinner, Text } from "@chakra-ui/react"
import { Snowflake } from "discord-api-types/globals"
import { APIUser } from "discord-api-types/v10"
import Link from "next/link"
import React, { useState } from "react"
import { Endpoints } from "../../util/constants"
import { getUser } from "../../util/routes/users"
import { UserAvatar } from "./UserAvatar"

export const UserLink: React.FC<{ id: Snowflake }> = ({ id }) => {
  const [user, setUser] = useState<APIUser | null>(null)

  React.useEffect(() => {
    getUser(id).then((user) => setUser(user))
  }, [id])

  if (!user)
    return (
      <HStack justify="flex-start" align="flex-start">
        <Spinner size="sm" />
        <Text as="span">{id}</Text>
      </HStack>
    )
  else
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
