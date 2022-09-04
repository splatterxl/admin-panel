import { Center } from "@chakra-ui/react"
import React from "react"

export const Full: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Center width="full" height="full">
      {children}
    </Center>
  )
}
