import { Box, Flex, Image, useBreakpointValue } from "@chakra-ui/react"
import Link from "next/link"
import React from "react"
import AuthStore from "../../stores/AuthStore"
import { Endpoints } from "../../util/constants"
import { Searchbar } from "./search/Searchbar"
import { AvatarDropdown } from "./settings/AvatarDropdown"
import { ThemeToggle } from "./settings/ThemeToggle"

export const Navbar: React.FC = () => {
  const auth = AuthStore.useValue(),
    imageWidth = useBreakpointValue({
      base: 48,
    })

  if (!auth) return null

  return (
    <Flex
      width="full"
      direction="row"
      justify="space-between"
      align="center"
      p={5}
      gap={12}
    >
      <Box w={52} as={Link} href={Endpoints.HOME} passHref>
        <a>
          <Image
            src="/assets/patchcord/patchcord-big.png"
            alt="Patchcord logo"
            userSelect="none"
            width={52}
            height="auto"
            _light={{
              filter: "invert(1)",
            }}
          />
        </a>
      </Box>
      <Searchbar />
      <Flex direction="row" align="center" justify="center">
        <AvatarDropdown />
        <ThemeToggle />
      </Flex>
    </Flex>
  )
}
