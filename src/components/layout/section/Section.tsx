import { Heading, HStack, VStack } from "@chakra-ui/react"
import React from "react"

export const Section: React.FC<{
  children: React.ReactNode
  actions?: React.ReactNode
  heading: string
}> = ({ children, actions = <></>, heading }) => {
  return (
    <VStack justify="flex-start" align="flex-start" width="full">
      <HStack justify="space-between" width="full" pr={1}>
        <Heading size="sm" fontWeight={400}>
          {heading}
        </Heading>
        {actions}
      </HStack>
      {children}
    </VStack>
  )
}
