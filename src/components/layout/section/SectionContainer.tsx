import { HStack } from "@chakra-ui/react"
import React from "react"

export const SectionContainer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <HStack
      justify="space-evenly"
      align="center"
      width="full"
      paddingY={2}
      gap={5}
      spacing={0}
    >
      {children}
    </HStack>
  )
}
