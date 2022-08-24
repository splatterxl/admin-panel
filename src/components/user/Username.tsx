import { HeadingProps, Text } from "@chakra-ui/react"
import { APIUser } from "discord-api-types/v10"
import React from "react"

export const Username: React.FC<{ d: APIUser } & HeadingProps> = ({
  d,
  ...props
}) => {
  return (
    <Text as="header" fontWeight={700} fontSize="3xl">
      <Text as="h2" display="inline-block">
        {d.username}
      </Text>
      <Text
        as="span"
        fontSize="xl"
        _dark={{ color: "gray.400" }}
        _light={{
          color: "gray.600",
        }}
      >
        #{d.discriminator}
      </Text>
    </Text>
  )
}
