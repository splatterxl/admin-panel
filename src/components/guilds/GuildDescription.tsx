import { Text } from "@chakra-ui/react"
import React from "react"

export const GuildDescription: React.FC<{
  description: string
  compact?: boolean
}> = ({ description, compact }) => {
  return (
    <Text
      mb={1}
      maxW={!compact ? 64 : undefined}
      textAlign={!compact ? "center" : "left"}
    >
      {description || "No description"}
    </Text>
  )
}
