import { HeadingProps, Text } from "@chakra-ui/react"
import React from "react"

export const Username: React.FC<
  { username: string; discriminator: string } & HeadingProps
> = ({ username, discriminator, ...props }) => {
  return (
    <Text as="header" fontWeight={700} fontSize="3xl">
      <Text as="h2" display="inline-block">
        {username}
      </Text>
      <Text
        as="span"
        fontSize="xl"
        _dark={{ color: "gray.400" }}
        _light={{
          color: "gray.600",
        }}
      >
        #{discriminator}
      </Text>
    </Text>
  )
}
