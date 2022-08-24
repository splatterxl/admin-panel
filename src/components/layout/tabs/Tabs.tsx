import { Box, Flex } from "@chakra-ui/react"
import React from "react"
import { Guilds } from "../../../icons/tabs/Guilds"
import { Users } from "../../../icons/tabs/Users"
import AuthStore from "../../../stores/AuthStore"
import SearchTypeStore, { SearchType } from "../../../stores/SearchTypeStore"
import { Endpoints } from "../../../util/constants"
import { TabItem } from "./TabItem"

export const Tabs: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const type = SearchTypeStore.useValue(),
    auth = AuthStore.useValue()

  if (!auth) return <>{children}</>

  return (
    <Flex
      h="85vh"
      w="full"
      direction="row"
      justify="flex-start"
      align="flex-start"
    >
      <Flex direction="column" justify="flex-start" align="center">
        <TabItem
          label="Users"
          selected={type === SearchType.USERS}
          href={Endpoints.USERS}
          icon={Users}
        />
        <TabItem
          label="Guilds"
          selected={type === SearchType.GUILDS}
          href={Endpoints.GUILDS}
          icon={Guilds}
        />
      </Flex>
      <Box w="full" h="full" p={2}>
        {children}
      </Box>
    </Flex>
  )
}
