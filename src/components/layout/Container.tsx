import { HStack, Stack, useMediaQuery, VStack } from "@chakra-ui/react"
import React from "react"
import AuthStore from "../../stores/AuthStore"
import { Colors } from "../../util/constants"
import { Logo } from "./navbar/Logo"
import { NavbarAvatar } from "./navbar/NavbarAvatar"
import { Tabs } from "./tabs/Tabs"

export const useIsMobile = () => useMediaQuery("(max-width: 48em)")

export const Container: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const auth = AuthStore.useValue(),
    [isMobile] = useIsMobile(),
    [isOpen, setOpen] = React.useState(false)

  console.log(isMobile, isOpen)

  return (
    <Stack
      minH="100vh"
      width="full"
      spacing={0}
      alignItems="flex-start"
      direction={{
        base: "column",
        md: "row",
      }}
      // this is a hack to display the sidebar color down the whole page
      _dark={{
        bgColor: Colors.BG_SECONDARY_DARK,
      }}
      _light={{
        bgColor: Colors.BG_SECONDARY_LIGHT,
      }}
    >
      <VStack
        display={auth ? "block" : "none"}
        height="full"
        width={{ base: "full", md: "auto" }}
        paddingRight={{ base: 4, md: 8 }}
        paddingLeft={6}
        paddingBottom={{
          base: isOpen ? 8 : 0,
          md: 4,
        }}
        paddingTop={2}
        justify="flex-start"
        _dark={{ bgColor: Colors.BG_SECONDARY_DARK }}
        _light={{
          bgColor: Colors.BG_SECONDARY_LIGHT,
        }}
      >
        <HStack mb={{ base: 2, md: 4 }} width="full" justify="space-between">
          <Logo />
          {isMobile ? <NavbarAvatar /> : null}
        </HStack>
        {!isMobile || isOpen ? <Tabs /> : null}
      </VStack>
      <VStack
        _dark={{ bgColor: Colors.BG_PRIMARY_DARK }}
        _light={{ bgColor: Colors.BG_PRIMARY_LIGHT }}
        minH="100vh"
        width="full"
        spacing={0}
        px={auth ? 6 : 0}
        py={auth ? 5 : 0}
      >
        {children}
      </VStack>
    </Stack>
  )
}
