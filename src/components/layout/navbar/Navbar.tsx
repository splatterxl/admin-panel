import { HStack } from "@chakra-ui/react"
import React from "react"
import AuthStore from "../../../stores/AuthStore"
import { useIsMobile } from "../Container"
import { NavbarAvatar } from "./NavbarAvatar"

export const Navbar: React.FC<{
  children?: React.ReactNode
  isSearch?: boolean
}> = ({ children, isSearch }) => {
  const auth = AuthStore.useValue(),
    [isMobile] = useIsMobile()

  if (!auth) return null

  return (
    <HStack
      spacing={0}
      width="full"
      justify={children ? "space-between" : "flex-end"}
      paddingBottom={{ base: 2, md: 2 }}
    >
      {children}
      {!isMobile ? <NavbarAvatar isSearch={isSearch} /> : null}
    </HStack>
  )
}
