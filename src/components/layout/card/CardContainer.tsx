import { Box } from "@chakra-ui/react"
import React from "react"
import { Colors, themed } from "../../../util/constants"

export const CardContainer: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <Box width="full" {...themed("bgColor", "card")}>
      {children}
    </Box>
  )
}
