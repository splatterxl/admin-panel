import { HStack, Text, Link as ChakraLink } from "@chakra-ui/react"
import Link from "next/link"
import React from "react"
import AuthStore from "../../../stores/AuthStore"
import CurrentUserStore from "../../../stores/CurrentUserStore"
import { Endpoints } from "../../../util/constants"
import { UserAvatar } from "../../user/UserAvatar"

export const Navbar: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const auth = AuthStore.useValue(),
    currentUser = CurrentUserStore.useValue()

  if (!auth) return null

  return (
    <HStack
      spacing={0}
      width="full"
      justify={children ? "space-between" : "flex-end"}
      paddingBottom={{ base: 7, md: 0 }}
    >
      {children}
      <Link href={Endpoints.USER(currentUser.id)} passHref={false}>
        <HStack as={ChakraLink} tabIndex={-1} gap={1}>
          <Text as="span" display={{ base: "none", md: "block" }}>{currentUser.username}</Text>
          <UserAvatar d={currentUser} w={7} noAlt />
        </HStack>
      </Link>
    </HStack>
  )
}
