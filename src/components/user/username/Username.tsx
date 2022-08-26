import { Text, TextProps, useToast } from "@chakra-ui/react"
import { Snowflake } from "discord-api-types/globals"
import React from "react"
import { BotTag } from "../BotTag"

export const Username: React.FC<
  {
    username: string
    discriminator: string
    isBot: boolean
    id: Snowflake
    editable?: boolean
    shouldCopy?: boolean
  } & TextProps
> = ({ username, id, discriminator, isBot, shouldCopy, ...props }) => {
  const toast = useToast()

  return (
    <Text
      as="header"
      fontWeight={700}
      fontSize="3xl"
      maxW={52}
      cursor={shouldCopy ? "pointer" : undefined}
      onClick={() => {
        if (!shouldCopy) return

        navigator.clipboard.writeText(id)

        toast({
          title: "Copied!",
          description: "Copied ID to clipboard",
          variant: "left-accent",
          isClosable: true,
          duration: 3e3,
        })
      }}
      {...props}
    >
      <Text as="h2" display="inline-block" maxW={52} textAlign="center">
        {username}
      </Text>
      <Text
        as="span"
        fontSize="xl"
        _dark={{ color: "gray.400" }}
        _light={{
          color: "gray.600",
        }}
        textAlign="center"
      >
        #{discriminator}
      </Text>
      {isBot ? <BotTag /> : null}
    </Text>
  )
}
