import { Center, Heading, HStack, VStack } from "@chakra-ui/react"
import React from "react"
import { themed } from "../../../util/constants"

export const Section: React.FC<{
  children: React.ReactNode
  actions?: React.ReactNode
  heading: string
}> = ({ children, actions = <></>, heading }) => {
  return (
    <VStack
      justify="flex-start"
      align="flex-start"
      width="full"
      mt={2}
      spacing={2}
    >
      <HStack justify="space-between" width="full" pr={1}>
        <Heading size="md" fontWeight={500} lineHeight={1}>
          {heading}
        </Heading>
        {actions}
      </HStack>
      {children === null ? (
        <Center
          width="full"
          p={16}
          fontSize="sm"
          opacity={0.6}
          userSelect="none"
          {...themed("bgColor", "secondary")}
        >
          Nothing to see here, yet
        </Center>
      ) : (
        children
      )}
    </VStack>
  )
}
