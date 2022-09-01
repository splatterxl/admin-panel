import { Heading, Text, VStack } from "@chakra-ui/react"
import React from "react"

export const TabSection: React.FC<{
  children: React.ReactNode
  label: string
}> = (props) => {
  return (
    <VStack spacing={1} mt={1} w="full">
      <Heading
        as="span"
        textTransform="uppercase"
        opacity={0.8}
        size="sm"
        fontSize="xs"
      >
        {props.label}
      </Heading>
      {props.children}
    </VStack>
  )
}
