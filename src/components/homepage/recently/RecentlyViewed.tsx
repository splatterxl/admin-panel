import { Flex, useBreakpointValue } from "@chakra-ui/react"
import React from "react"

export const RecentlyViewed: React.FC<{
  limit?: number
  children: React.ReactNode[]
}> = ({ limit, children }) => {
  const defaultLimit = useBreakpointValue({
    base: 5,
    md: 8,
    lg: 10,
  })

  return (
    <Flex direction="row" gap={4} align="center" justify="flex-start">
      {children.slice(0, limit ?? defaultLimit)}
    </Flex>
  )
}
