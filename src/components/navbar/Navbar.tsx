import { Box, Flex } from "@chakra-ui/react"
import Link from "next/link"
import React from "react"
import AuthStore from "../../stores/AuthStore"
import { Endpoints } from "../../util/constants"
import { Searchbar } from "../search/Searchbar"
import { AvatarDropdown } from "./settings/AvatarDropdown"
import { ThemeToggle } from "./settings/ThemeToggle"

export const Navbar: React.FC = () => {
  const auth = AuthStore.useValue()

  if (!auth) return null

  return (
    <Flex
      width="full"
      direction="row"
      justify={{ md: "space-between", base: "flex-start" }}
      align="center"
      p={5}
      gap={{ md: 12, base: 3 }}
    >
      <Box w={52} as={Link} href={Endpoints.HOME} passHref>
        <a>
          <Box
            role="img"
            bgImg={{
              base: "/assets/patchcord/patchcord.png",
              md: "/assets/patchcord/patchcord-big.png",
            }}
            userSelect="none"
            width={{ md: 52, base: 12 }}
            height="auto"
            _light={{
              filter: "invert(1)",
            }}
          />
        </a>
      </Box>
      <Searchbar />
      <Flex
        direction="row"
        align="center"
        justify="center"
        display={{ base: "none", md: "block" }}
      >
        <AvatarDropdown />
        <ThemeToggle />
      </Flex>
    </Flex>
  )
}
