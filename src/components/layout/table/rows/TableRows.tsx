import { VStack } from "@chakra-ui/react"
import React from "react"
import { themed } from "../../../../util/constants"

// TODO
export const TableRows: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <VStack
      spacing={0}
      justify="flex-start"
      align="flex-start"
      width="full"
      borderRadius="sm"
      {...themed("bgColor", "secondary")}
    >
      {children}
    </VStack>
  )
}
