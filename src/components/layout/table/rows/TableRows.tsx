import { VStack } from "@chakra-ui/react"
import React from "react"
import { themed } from "../../../../util/constants"

// TODO
export const TableRows: React.FC<{
  children: React.ReactNode
  compact?: boolean
}> = ({ children, compact = false }) => {
  return (
    <VStack
      spacing={0}
      mt={0}
      pt={0}
      justify="flex-start"
      align="flex-start"
      width="full"
      borderRadius="sm"
      {...themed("bgColor", "tertiary")}
      gap="1px"
      boxShadow={
        "0px 2px 0px rgba(4, 4, 5, 0.05), 0px 1.5px 0px rgba(6, 6, 7, 0.05), 0px 1px 0px rgba(4, 4, 5, 0.2);"
      }
    >
      {children}
    </VStack>
  )
}
