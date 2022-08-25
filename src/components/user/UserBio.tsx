import { Text } from "@chakra-ui/react"
import React from "react"

export const UserBio: React.FC<{ bio: string; compact?: boolean }> = ({
  bio,
  compact,
}) => {
  return (
    <Text
      mb={1}
      maxW={!compact ? 52 : undefined}
      textAlign={!compact ? "center" : "left"}
    >
      {bio || "No bio"}
    </Text>
  )
}
