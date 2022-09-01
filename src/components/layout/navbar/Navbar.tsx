import { Flex } from "@chakra-ui/react"
import Link from "next/link"
import React from "react"
import AuthStore from "../../../stores/AuthStore"
import CurrentUserStore from "../../../stores/CurrentUserStore"
import { Endpoints } from "../../../util/constants"
import { UserAvatar } from "../../user/UserAvatar"

export const Navbar: React.FC = () => {
  const auth = AuthStore.useValue(),
    currentUser = CurrentUserStore.useValue()

  if (!auth) return null

  return (
    <Flex
      width="full"
      direction="row"
      justify="flex-end"
      align="center"
      py={5}
      pl={8}
      pr={5}
      gap={3}
    >
      {currentUser.username}
      <Link href={Endpoints.USER(currentUser.id)} passHref={false}>
        <a tabIndex={-1}>
          <UserAvatar d={currentUser} w={7} />
        </a>
      </Link>
    </Flex>
  )
}
