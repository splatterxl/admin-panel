import { Text, VStack } from "@chakra-ui/react"
import { APIGuild } from "discord-api-types/v10"
import { getDate } from "discord-snowflake"
import React from "react"
import FocusedGuildStore from "../../../stores/FocusedGuildStore"
import { Field } from "../../layout/Field"
import { GuildOwnershipTransferModal } from "../../modals/GuildOwnershipTransferModal"
import { PageHeader } from "../../PageHeader"
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
      <PageHeader
        fields={
          <>
            <Field name="ID" value={data.id} />
            <Field
              name="Creation Date"
              value={getDate(data.id as `${bigint}`).toLocaleString()}
            />
            <GuildHeaderOwnerLink owner_id={data.owner_id} setOpen={setOpen} />
          </>
        }
      >
        <GuildIcon id={data.id} hash={data.icon} name={data.name} size="sm" />
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
      </PageHeader>
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
