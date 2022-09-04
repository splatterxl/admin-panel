import { HStack, Link as ChakraLink, Text } from "@chakra-ui/react"
import Link from "next/link"
import React from "react"
import AuthStore from "../../../stores/AuthStore"
import CurrentUserStore from "../../../stores/CurrentUserStore"
import { Endpoints } from "../../../util/constants"
import { UserAvatar } from "../../user/UserAvatar"

export const Navbar: React.FC<{
  children?: React.ReactNode
  isSearch?: boolean
}> = ({ children, isSearch }) => {
  const auth = AuthStore.useValue(),
    currentUser = CurrentUserStore.useValue()

  if (!auth) return null

  return (
    <HStack
      spacing={0}
      width="full"
      justify={children ? "space-between" : "flex-end"}
      paddingBottom={{ base: 2, md: 0 }}
    >
      {children}
      <Link href={Endpoints.USER(currentUser.id)} passHref={false}>
        <HStack as={ChakraLink} tabIndex={-1} gap={1} pl={isSearch ? 3 : 0}>
          <Text
            as="span"
            display={{
              base: "none",
              md: isSearch ? "none" : "block",
            }}
          >
            {currentUser.username}
          </Text>
          <UserAvatar d={currentUser} w={isSearch ? 9 : 7} noAlt />
        </HStack>
      </Link>
    </HStack>
  )
}
