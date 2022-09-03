import { VStack } from "@chakra-ui/react"
import React from "react"

// TODO
export const TableRows: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <VStack spacing={0} justify="flex-start" align="flex-start" w="full">
      {children}
    </VStack>
  )
}
