import { Box, Flex, Image } from "@chakra-ui/react"
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
      <Box
        w={{
          md: 48,
          base: 20,
        }}
      >
        <Box
          position={{
            base: "absolute",
            md: "initial",
          }}
          top={0}
          left={0}
          mt={{ base: 3, md: 0 }}
          ml={{ base: 6, md: 0 }}
        >
          <Link href={Endpoints.HOME} passHref>
            <a>
              <Image
                src="/assets/patchcord/patchcord-big.png"
                alt="Patchcord logo"
                userSelect="none"
                width={{ md: 48, base: 48 }}
                _light={{
                  filter: "invert(1)",
                }}
                clipPath={{
                  base: "polygon(0 0, 25% 0, 25% 100%, 0% 100%)",
                  md: "none",
                }}
              />
            </a>
          </Link>
        </Box>
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
