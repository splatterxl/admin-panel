import { Flex, HStack, Stack, Text, VStack } from "@chakra-ui/react"
import { APIGuild } from "discord-api-types/v10"
import { getDate } from "discord-snowflake"
import React from "react"
import FocusedGuildStore from "../../../stores/FocusedGuildStore"
import { themed } from "../../../util/constants"
import { Field } from "../../layout/Field"
import { GuildOwnershipTransferModal } from "../../modals/GuildOwnershipTransferModal"
import { GuildIcon } from "../GuildIcon"
import { GuildName } from "../info/GuildName"
import { GuildHeaderOwnerLink } from "./GuildHeaderOwnerLink"

export const GuildHeader: React.FC = () => {
  const [isOwnershipModalOpen, setOpen] = React.useState(false),
    [data, setData] = FocusedGuildStore.useState()

  if (!data) return null

  function onClose() {
    setOpen(false)
  }

  return (
    <>
      <Flex
        justify="flex-start"
        rounded="md"
        p={{ base: 8, md: 4 }}
        pb={2}
        minW={{ base: 0, md: "full" }}
        {...themed("bgColor", "secondary")}
      >
        <Stack
          align="center"
          direction={{ base: "column", md: "row" }}
          justify={{ base: "center", md: "flex-start" }}
          spacing={0}
          gap={2}
          // minW={{ base: "full", md: 0 }}
        >
          <HStack
            justify="flex-start"
            align="center"
            borderRightWidth={{ base: 0, md: 2 }}
            borderBottomWidth={{ base: 2, md: 0 }}
            paddingRight={{ base: 0, md: 4 }}
            paddingBottom={{ base: 2, md: 0 }}
            marginBottom={{ base: 1, md: 0 }}
            borderColor="rgba(255, 255, 255, 0.1)"
            spacing={0}
            gap={2}
          >
            <GuildIcon
              id={data.id}
              hash={data.icon}
              name={data.name}
              size="sm"
            />
            <VStack justify="flex-start" align="flex-start" spacing={0}>
              <GuildName name={data.name} flags={data.features} />
              <Text
                fontWeight={400}
                fontSize={{ base: "md", md: "sm" }}
                fontFamily="normal"
              >
                {/* @ts-ignore */}
                {data.member_count} members
              </Text>
            </VStack>
          </HStack>
          <HStack
            spacing={0}
            pl={{ base: 0, md: 2 }}
            justify={{ base: "flex-start", sm: "center", md: "flex-start" }}
            flexWrap="wrap"
            gap={6}
          >
            <Field name="ID" value={data.id} />
            <Field
              name="Creation Date"
              value={getDate(data.id as `${bigint}`).toLocaleString()}
            />
            <GuildHeaderOwnerLink owner_id={data.owner_id} setOpen={setOpen} />
          </HStack>
        </Stack>
      </Flex>
      <GuildOwnershipTransferModal
        id={data.id}
        isOpen={isOwnershipModalOpen}
        onClose={onClose}
        apply={(newOwner) => {
          setData((data) => ({ ...data, owner_id: newOwner } as APIGuild))
          onClose()
        }}
      />
    </>
  )
}
