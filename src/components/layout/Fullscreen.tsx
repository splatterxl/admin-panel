import { Center } from "@chakra-ui/react"
import React from "react"

export const Fullscreen: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <Center h="100vh" w="full">
      {children}
    </Center>
  )
}
