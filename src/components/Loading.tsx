import { HStack, Spinner, Text } from "@chakra-ui/react"
import React from "react"

export const Loading: React.FC<{
  size: "sm" | "md" | "lg" | `x${"l" | "s"}`
}> = ({ size }) => {
  return (
    <HStack justify="flex-start" align="center">
      <Spinner size={size} />
      <Text size={size}>Loading...</Text>
    </HStack>
  )
}
