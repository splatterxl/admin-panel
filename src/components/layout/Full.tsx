import { Center } from "@chakra-ui/react"
import React from "react"

export const Full: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Center w="full" h="full">
      {children}
    </Center>
  )
}
