import { Flex, HStack, Icon, Text, VStack } from "@chakra-ui/react"
import { getDate } from "discord-snowflake"
import React from "react"
import { MdEdit } from "react-icons/md"
import FocusedGuildStore from "../../stores/FocusedGuildStore"
import { themed } from "../../util/constants"
import { GhostButton } from "../GhostButton"
import { Field } from "../layout/Field"
import { GuildOwnershipTransferModal } from "../modals/GuildOwnershipTransferModal"
import { UserLink } from "../user/UserLink"
import { GuildIcon } from "./GuildIcon"
import { GuildName } from "./info/GuildName"

export const GuildHeader: React.FC = () => {
  const [isOwnershipModalOpen, setOpen] = React.useState(false),
    [data, setData] = FocusedGuildStore.useState()

  function onClose() {
    setOpen(false)
  }

  return (
    <>
      <Flex
        justify="space-between"
        rounded="md"
        p={4}
        width="full"
        {...themed("bgColor", "secondary")}
      >
        <HStack justify="flex-start" align="center">
          <HStack
            justify="flex-start"
            align="center"
            borderRightWidth={2}
            paddingRight={3}
            borderColor="rgba(255, 255, 255, 0.1)"
          >
            <GuildIcon
              id={data.id}
              hash={data.icon}
              name={data.name}
              size="sm"
            />
            <VStack justify="flex-start" align="flex-start" spacing={0}>
              <GuildName name={data.name} flags={data.features} />
              <Text fontWeight={400} fontSize="sm" fontFamily="normal">
                {/* @ts-ignore */}
                {data.member_count} members
              </Text>
            </VStack>
          </HStack>
          <HStack spacing={4} pl={2}>
            <Field name="ID" value={data.id} />
            <Field
              name="Creation Date"
              value={getDate(data.id as `${bigint}`).toLocaleString()}
            />
            <Field
              name="Owner"
              value={<UserLink id={data.owner_id} />}
              action={
                <GhostButton
                  size="xx-small"
                  onClick={() => {
                    setOpen(true)
                  }}
                  aria-label="Transfer Ownership"
                >
                  <Icon
                    as={MdEdit}
                    boxSize="0.7em"
                    {...themed("fill", "header_secondary")}
                  />
                </GhostButton>
              }
            />
          </HStack>
        </HStack>
      </Flex>
      <GuildOwnershipTransferModal
        id={data.id}
        isOpen={isOwnershipModalOpen}
        onClose={onClose}
        apply={(newOwner) => {
          setData((prev) => ({ ...prev, owner_id: newOwner } as any))
          onClose()
        }}
      />
    </>
  )
}
