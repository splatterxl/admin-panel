import { Box } from "@chakra-ui/react"
import React from "react"
import { Colors } from "../../../util/constants"

export const CardContainer: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <Box
      _dark={{ backgroundColor: Colors.BG_CARD_DARK }}
      _light={{
        backgroundColor: Colors.BG_CARD_LIGHT,
      }}
      width="full"
    >
      {children}
    </Box>
  )
}
