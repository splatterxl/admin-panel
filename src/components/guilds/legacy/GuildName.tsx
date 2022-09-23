import {
  Center,
  Heading,
  IconProps,
  TextProps,
  useToast,
} from "@chakra-ui/react"
import { Snowflake } from "discord-api-types/globals"
import { GuildFeature } from "discord-api-types/v10"
import React from "react"
import { GuildPartnered } from "../../../icons/guild/PartneredIcon"
import { GuildVerified } from "../../../icons/guild/VerifiedIcon"

export const GuildName: React.FC<
  {
    name: string
    features: string[]
    id: Snowflake
    compact?: boolean
  } & TextProps
> = ({ name, features, id, compact, ...props }) => {
  const toast = useToast()

  let Components: React.ComponentType<IconProps>[] = []

  if (features.includes(GuildFeature.Partnered)) Components.push(GuildPartnered)
  if (features.includes(GuildFeature.Verified)) Components.push(GuildVerified)

  return (
    <Heading
      cursor={!compact ? "pointer" : undefined}
      onClick={() => {
        if (compact) return

        navigator.clipboard.writeText(id)

        toast({
          title: "Copied!",
          description: "Copied ID to clipboard",
          variant: "left-accent",
          isClosable: true,
          duration: 3e3,
        })
      }}
      textAlign={compact ? undefined : "center"}
      display="flex"
      maxW={!compact ? 64 : undefined}
      flexWrap="wrap"
      align="center"
      size="lg"
      {...props}
    >
      {name}
      {Components.length ? (
        <Center
          fontSize="2xl"
          display={compact ? "inline-block" : "inline-flex"}
          width={!compact ? "full" : undefined}
          ml={1}
        >
          {Components.map((V, i) => {
            return <V key={i} />
          })}
        </Center>
      ) : null}
    </Heading>
  )
}
