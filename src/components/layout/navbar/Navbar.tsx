import { HStack } from "@chakra-ui/react"
import Link from "next/link"
import React from "react"
import AuthStore from "../../../stores/AuthStore"
import CurrentUserStore from "../../../stores/CurrentUserStore"
import { Endpoints } from "../../../util/constants"
import { UserAvatar } from "../../user/UserAvatar"

export const Navbar: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const auth = AuthStore.useValue(),
    currentUser = CurrentUserStore.useValue()

  if (!auth) return null

  console.log(currentUser)

  return (
    <HStack spacing={0} width="full" justify="space-between">
      {children}
      <Link href={Endpoints.USER(currentUser.id)} passHref={false}>
        <HStack as="a" tabIndex={-1}>
          {currentUser.username}
          <UserAvatar d={currentUser} w={7} />
        </HStack>
      </Link>
    </HStack>
  )
}
