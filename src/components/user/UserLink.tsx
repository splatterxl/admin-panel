import { HStack, Text } from "@chakra-ui/react"
import { Snowflake } from "discord-api-types/globals"
import { APIUser } from "discord-api-types/v10"
import Link from "next/link"
import React, { useState } from "react"
import { Endpoints } from "../../util/constants"
import { User } from "../../util/routes/types"
import { getUser } from "../../util/routes/users"
import { UserAvatar } from "./UserAvatar"

export const UserLink: React.FC<{ id: Snowflake }> = ({ id }) => {
  const [user, setUser] = useState<APIUser | null>(null)

  React.useEffect(() => {
    getUser(id).then((user) => setUser(user))
  }, [id])

  if (!user) return <>{id}</>
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
          <Text as="span">{user.username}</Text>
        </HStack>
      </Link>
    )
}
