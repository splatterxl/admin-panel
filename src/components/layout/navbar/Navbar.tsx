import { HStack, Link as ChakraLink, Text } from "@chakra-ui/react"
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"
import AuthStore from "../../../stores/AuthStore"
import CurrentUserStore from "../../../stores/CurrentUserStore"
import { Endpoints } from "../../../util/constants"
import { UserAvatar } from "../../user/UserAvatar"

export const Navbar: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const auth = AuthStore.useValue(),
    currentUser = CurrentUserStore.useValue(),
    { pathname } = useRouter(),
    // FIXME(splatterxl): This is a hack to not interfere with the navbar on the search page,
    // since the implementation for embedded searches actually draws from the search page.
    // We can guarantee for embedded searches that the pathname will not be Endpoints.SEARCH.
    isSearch = pathname === Endpoints.SEARCH

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
        <HStack as={ChakraLink} tabIndex={-1} gap={isSearch ? 3 : 1}>
          <Text
            as="span"
            display={{
              base: "none",
              md: isSearch ? "none" : "block",
            }}
          >
            {currentUser.username}
          </Text>
          <UserAvatar d={currentUser} w={7} noAlt />
        </HStack>
      </Link>
    </HStack>
  )
}
