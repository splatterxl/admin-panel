import { Center, Flex, HStack, Icon, Stack } from "@chakra-ui/react"
import React from "react"
import { BsThreeDotsVertical } from "react-icons/bs"
import { themed } from "../util/constants"

export const PageHeader: React.FC<{
  children: React.ReactNode
  fields: React.ReactNode
}> = (props) => {
  return (
    <>
      <Flex
        justify="flex-start"
        rounded="md"
        p={{ base: 8, md: 4 }}
        minW={{ base: 0, md: "full" }}
        {...themed("bgColor", "secondary")}
      >
        <Stack
          align="center"
          direction={{ base: "column", md: "row" }}
          justify={{ base: "center", md: "flex-start" }}
          spacing={0}
          gap={2}
        >
          <HStack
            justify="flex-start"
            align="center"
            borderRightWidth={{ base: 0, md: 1 }}
            borderBottomWidth={{ base: 2, md: 0 }}
            paddingRight={{ base: 0, md: 4 }}
            paddingBottom={{ base: 4, md: 0 }}
            marginBottom={{ base: 1, md: 0 }}
            borderColor="rgba(255, 255, 255, 0.1)"
            spacing={0}
            gap={4}
          >
            <HStack justify="space-between" align="center">
              {props.children}
            </HStack>
            <Center pr={2}>
              <Icon
                as={BsThreeDotsVertical}
                {...themed("fill", "text.muted")}
              />
            </Center>
          </HStack>
          <HStack
            spacing={0}
            pl={{ base: 0, md: 2 }}
            justify={{ base: "flex-start", sm: "center", md: "flex-start" }}
            flexWrap="wrap"
            gap={6}
          >
            {props.fields}
          </HStack>
        </Stack>
      </Flex>
    </>
  )
}
