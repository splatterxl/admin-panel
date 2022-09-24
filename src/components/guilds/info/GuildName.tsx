import { Heading, HStack } from "@chakra-ui/react"
import { GuildFeature } from "discord-api-types/v10"
import { GuildPartnered } from "../../../icons/guild/PartneredIcon"
import { GuildVerified } from "../../../icons/guild/VerifiedIcon"

export const GuildName: React.FC<{ name: string; flags: GuildFeature[] }> = ({
  name,
  flags,
}) => {
  return (
    <HStack justify="flex-start" align="center" spacing={1}>
      <Heading
        fontFamily="normal"
        size={{ base: "md", md: "sm" }}
        as="h2"
        fontWeight={600}
      >
        {name}
      </Heading>
      <HStack spacing={0.5} justify="flex-start" align="center">
        {flags.includes(GuildFeature.Partnered) ? <GuildPartnered /> : null}
        {flags.includes(GuildFeature.Verified) ? <GuildVerified /> : null}
      </HStack>
    </HStack>
  )
}
