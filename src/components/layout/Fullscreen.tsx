import { Center } from "@chakra-ui/react";
import React from "react";
import { Colors } from "../../util/constants";

export const Fullscreen: React.FC<{
  children: React.ReactNode
  bg?: boolean
}> = ({ children, bg }) => {
  return (
    <Center
      height="100vh"
      width="full"
      _dark={{
        bgColor: bg ? Colors.BG_PRIMARY_DARK : undefined,
      }}
      _light={{
        bgColor: bg ? Colors.BG_PRIMARY_LIGHT : undefined,
      }}
    >
      {children}
    </Center>
  )
}
