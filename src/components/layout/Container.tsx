import { Box, HStack, VStack } from "@chakra-ui/react"
import React from "react"
import { MdHomeFilled } from "react-icons/md"
import AuthStore from "../../stores/AuthStore"
import SearchTypeStore from "../../stores/SearchTypeStore"
import { Colors, Endpoints } from "../../util/constants"
import { Logo } from "./navbar/Logo"
import { Navbar } from "./navbar/Navbar"
import { TabItem } from "./tabs/TabItem"

export const Tabs: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const type = SearchTypeStore.useValue(),
    auth = AuthStore.useValue()

  if (!auth) return <>{children}</>

  return (
    <HStack h="100vh" w="full" spacing={0}>
      <VStack
        position={{
          base: "absolute",
          md: "relative",
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
        <TabItem
          icon={MdHomeFilled}
          label="Home"
          href={Endpoints.HOME}
          selected
        />
      </VStack>
      <VStack
        _dark={{ bgColor: Colors.BG_PRIMARY_DARK }}
        _light={{ bgColor: Colors.BG_PRIMARY_LIGHT }}
        h="full"
        w="full"
      >
        <Navbar />
        {children}
      </VStack>
    </HStack>
  )
}
