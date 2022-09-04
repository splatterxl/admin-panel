import { Heading, VStack } from "@chakra-ui/react"
import React from "react"

export const TabSection: React.FC<{
  children: React.ReactNode
  label: string
}> = (props) => {
  return (
    <VStack spacing={2} pt={2} width="full">
      <Heading
        as="span"
        textTransform="uppercase"
        userSelect="none"
        opacity={0.4}
        size="sm"
        fontSize="xs"
        width="full"
      >
        {props.label}
      </Heading>
      <VStack spacing={3} width="full">
        {props.children}
      </VStack>
    </VStack>
  )
}
