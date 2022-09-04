import { Box, HStack, Stack, useMediaQuery, VStack } from "@chakra-ui/react"
import React from "react"
import AuthStore from "../../stores/AuthStore"
import { Colors, Theme } from "../../util/constants"
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
        paddingBottom={{
          base: isOpen ? 8 : 0,
          md: 4,
        }}
        paddingRight={{
          base: 0,
          md: 8,
        }}
        justify="flex-start"
        {...Theme.bgSecondary}
      >
        <HStack
          paddingBottom={{ base: 2, md: 0 }}
          paddingRight={{ base: 4, md: 0 }}
          paddingLeft={{ base: 4, md: 3 }}
          paddingTop={2}
          width="full"
          justify={{ base: "space-between", md: "flex-start" }}
          {...(isMobile ? Theme.bgTertiary : Theme.bgSecondary)}
        >
          <Logo isOpen={isOpen} setOpen={setOpen} />
          {isMobile ? <NavbarAvatar /> : null}
        </HStack>
        {!isMobile || isOpen ? (
          <Box
            width={{ base: "full", md: "25vh" }}
            paddingRight={{ base: 4, md: 0 }}
            paddingLeft={{ base: 4, md: 6 }}
            paddingTop={{
              base: 1,
              md: 0,
            }}
          >
            <Tabs />
          </Box>
        ) : null}
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
