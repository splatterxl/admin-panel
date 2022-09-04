import { Flex, Heading, Text, TextProps, useToast } from "@chakra-ui/react"
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
    <Flex
      as="header"
      fontWeight={700}
      fontSize="3xl"
      maxW={shouldCopy ? 52 : undefined}
      cursor={shouldCopy ? "pointer" : undefined}
      flexDirection={shouldCopy ? "column" : "row"}
      marginBottom={shouldCopy ? 2 : 0}
      display={shouldCopy ? "flex" : "block"}
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
      <Heading
        as="h2"
        size="lg"
        display="inline-block"
        maxW={shouldCopy ? 52 : undefined}
        textAlign={shouldCopy ? "center" : undefined}
        lineHeight={1}
      >
        {username}
      </Heading>
      <Heading
        as="span"
        fontSize="xl"
        w="full"
        _dark={{ color: "gray.400" }}
        _light={{
          color: "gray.600",
        }}
        textAlign={shouldCopy ? "center" : undefined}
      >
        #{discriminator}
      </Heading>
      {isBot ? <BotTag /> : null}
    </Flex>
  )
}
