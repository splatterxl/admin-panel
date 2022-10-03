import { Text, VStack } from "@chakra-ui/react"
import { getDate, Snowflake } from "discord-snowflake"
import React from "react"
import FocusedUserStore from "../../../stores/FocusedUserStore"
import { useIsMobile } from "../../layout/Container"
import { Field } from "../../layout/Field"
import { PageHeader } from "../../PageHeader"
import { UserAvatar } from "../UserAvatar"
import { UserFlagsRow } from "../UserFlags"

export const UserHeader: React.FC = () => {
  const data = FocusedUserStore.useValue()!

  const [mobile] = useIsMobile()

  return (
    <PageHeader
      fields={
        <>
          <Field name="ID" value={data.id} />
          <Field
            name="User since"
            value={getDate(data.id as Snowflake).toLocaleString()}
          />
        </>
      }
    >
      <UserAvatar
        id={data.id}
        alt=""
        hash={data.avatar}
        discriminator={+data.discriminator}
        width={{ base: 7, md: 10 }}
      />
      <VStack justify="flex-start" align="flex-start" spacing={0}>
        <Text as="span" fontWeight={450} lineHeight={1.3}>
          {data.username}#{data.discriminator}
        </Text>
        {(data.flags !== 0 || data.premium_type != null) && !mobile ? (
          <UserFlagsRow
            bitfield={data.flags ?? 0}
            nitro={data.premium_type!}
            default="No badges"
          />
        ) : null}
      </VStack>
    </PageHeader>
  )
}
