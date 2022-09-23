import { HStack, Link as ChakraLink, Text } from "@chakra-ui/react"
import Link from "next/link"
import React from "react"
import CurrentUserStore from "../../../stores/CurrentUserStore"
import { Endpoints } from "../../../util/constants"
import { UserAvatar } from "../../user/UserAvatar"

export const NavbarAvatar: React.FC<{ isSearch?: boolean }> = ({
  isSearch,
}) => {
  const currentUser = CurrentUserStore.useValue()

  if (!currentUser) return null

  return (
    <Link href={Endpoints.USER(currentUser.id)} passHref={false}>
      <HStack as={ChakraLink} tabIndex={-1} gap={0.5} pl={isSearch ? 3 : 0}>
        <Text
          as="span"
          display={{
            base: "none",
            md: isSearch ? "none" : "block",
          }}
        >
          {currentUser.username}
        </Text>
        <UserAvatar
          id={currentUser.id}
          alt=""
          discriminator={parseInt(currentUser.discriminator)}
          hash={currentUser.avatar}
          width={isSearch ? 9 : { base: 8, md: 7 }}
        />
      </HStack>
    </Link>
  )
}
