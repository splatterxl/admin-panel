import { Box, HStack, VStack } from "@chakra-ui/react"
import { useRouter } from 'next/router';
import React from "react"
import AuthStore from "../../stores/AuthStore"
import { Colors } from "../../util/constants"
import { Logo } from "./navbar/Logo"
import { Tabs } from "./tabs/Tabs"

export const Container: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const auth = AuthStore.useValue()

  return (
    <HStack
      minH="100vh"
      w="full"
      spacing={0}
      alignItems="flex-start"
      // this is a hack to display the sidebar color down the whole page
      _dark={{
        bgColor: Colors.BG_SECONDARY_DARK,
      }}
      _light={{
        bgColor: Colors.BG_SECONDARY_LIGHT,
      }}
    >
      <VStack
        display={auth ? { base: "none", lg: "block" } : "none"}
        position={{
          base: "absolute",
          lg: "relative",
        }}
        h="full"
        pr={8}
        pl={6}
        pb={4}
        pt={2}
        justify="flex-start"
        _dark={{ bgColor: Colors.BG_SECONDARY_DARK }}
        _light={{
          bgColor: Colors.BG_SECONDARY_LIGHT,
        }}
      >
        <Box mb={2}>
          <Logo />
        </Box>
        <Tabs />
      </VStack>
      <VStack
        _dark={{ bgColor: Colors.BG_PRIMARY_DARK }}
        _light={{ bgColor: Colors.BG_PRIMARY_LIGHT }}
        minH="100vh"
        w="full"
        spacing={0}
        px={auth ? 6 : 0}
        py={auth ? 5 : 0}
      >
        {children}
      </VStack>
    </HStack>
  )
}
