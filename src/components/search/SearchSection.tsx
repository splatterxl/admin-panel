import { Flex, Heading } from "@chakra-ui/react"
import React from "react"

export const SearchSection: React.FC<{
  label: string
  children: React.ReactNode
}> = ({ label, children }) => {
  return (
    <Flex
      direction="column"
      justify="flex-start"
      align="flex-start"
      w="full"
      h="full"
    >
      <Heading as="h3" size="sm">
        {label}
      </Heading>
      <Flex
        w="full"
        direction="column"
        justify="flex-start"
        align="flex-start"
        paddingY={3}
        gap={2}
      >
        {children}
      </Flex>
    </Flex>
  )
}
