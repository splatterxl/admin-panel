import { Flex, Heading, TextProps } from "@chakra-ui/react"
import { Snowflake } from "discord-api-types/globals"
import React from "react"

export const Username: React.FC<
  {
    username: string
    discriminator: string
    isBot: boolean
    id: Snowflake
  } & TextProps
> = ({ username, id, discriminator, isBot, ...props }) => {
  return (
    <Flex
      as="header"
      fontWeight={700}
      flexDirection="row"
      lineHeight={1}
      marginBottom={0}
      display="block"
      {...props}
    >
      <Heading
        as="h2"
        size={props.size ?? "lg"}
        display="inline-block"
        lineHeight={1}
      >
        {username}
      </Heading>
      <Heading
        as="span"
        fontSize={props.size ?? "lg"}
        _dark={{ color: "gray.400" }}
        _light={{
          color: "gray.600",
        }}
      >
        #{discriminator}
      </Heading>
    </Flex>
  )
}
