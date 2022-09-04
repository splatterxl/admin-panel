import { Center } from "@chakra-ui/react"
import React from "react"
import { themed } from "../../util/constants"

export const Fullscreen: React.FC<{
  children: React.ReactNode
  bg?: boolean
}> = ({ children, bg }) => {
  return (
    <Center
      height="100vh"
      width="full"
      {...(bg ? themed("bgColor", "primary") : {})}
    >
      {children}
    </Center>
  )
}
