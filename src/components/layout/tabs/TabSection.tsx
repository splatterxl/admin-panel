import { Heading, VStack } from "@chakra-ui/react"
import React from "react"

export const TabSection: React.FC<{
  children: React.ReactNode
  label: string
}> = (props) => {
  return (
    <VStack spacing={3} pt={2} width="full">
      <Heading
        as="span"
        textTransform="uppercase"
        opacity={0.4}
        size="sm"
        fontSize="xs"
        width="full"
      >
        {props.label}
      </Heading>
      {props.children}
    </VStack>
  )
}
