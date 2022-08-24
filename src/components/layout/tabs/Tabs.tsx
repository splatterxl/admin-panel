import { Box, Flex } from "@chakra-ui/react"
import React from "react"
import { Guilds } from "../../../icons/Guilds"
import { Users } from "../../../icons/Users"
import SearchTypeStore, { SearchType } from "../../../stores/SearchTypeStore"
import { Endpoints } from "../../../util/constants"
import { TabItem } from "./TabItem"

export const Tabs: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const type = SearchTypeStore.useValue()

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
