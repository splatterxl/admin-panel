import { Box, Flex, FlexProps } from "@chakra-ui/react"
import { APIUser } from "discord-api-types/v10"
import Link from "next/link"
import React from "react"
import { Endpoints } from "../../util/constants"
import { EditableUserFlags } from "./flags/EditableUserFlags"
import { UserFlagsRow } from "./flags/UserFlags"
import { UserAvatar } from "./UserAvatar"
import { Username } from "./Username"

export const UserCard: React.FC<
  { d: APIUser; compact?: boolean } & FlexProps
> = ({ d, compact = false, ...props }) => {
  const content = (
    <Flex
      as={compact ? "a" : undefined}
      width={compact ? "full" : "auto"}
      direction={compact ? "row" : "column"}
      alignItems="center"
      justify="flex-start"
      paddingTop={compact ? 2 : 4}
      paddingBottom={3}
      paddingX={4}
      gap={compact ? 4 : 2}
      borderRadius="lg"
      borderWidth={1}
    >
      {d.avatar && <UserAvatar d={d} />}
      {compact ? (
        <Flex
          as="section"
          width="full"
          direction="column"
          alignItems="flex-start"
          justify="flex-end"
        >
          <Username d={d} />
          <Box as="hr" w="full" mb={2} />
          <UserFlagsRow
            bitfield={d.flags!}
            nitro={d.premium_type!}
            boxSize="1.3em"
          />
        </Flex>
      ) : (
        <Flex direction="column" justify="flex-start" align="center">
          <Username d={d} />
          <Box as="hr" w="60%" mb={2} />
          <EditableUserFlags d={d} />
        </Flex>
      )}
    </Flex>
  )

  if (compact)
    return (
      <Link href={Endpoints.USER(d.id)} passHref>
        {content}
      </Link>
    )
  else return <>{content}</>
}
