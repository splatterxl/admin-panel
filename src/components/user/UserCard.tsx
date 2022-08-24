import { Box, BoxProps, Flex, FlexProps, Text } from "@chakra-ui/react"
import Link from "next/link"
import React from "react"
import { Endpoints } from "../../util/constants"
import { User } from "../../util/types"
import { EditableUserFlags } from "./flags/EditableUserFlags"
import { UserFlagsRow } from "./flags/UserFlags"
import { UserAvatar } from "./UserAvatar"
import { Username } from "./Username"

export const Hr: React.FC<BoxProps> = (props) => (
  <Box
    as="hr"
    w="60%"
    mb={2}
    _light={{
      borderColor: "gray.400",
    }}
    {...props}
  />
)

export const UserCard: React.FC<{ d: User; compact?: boolean } & FlexProps> = ({
  d,
  compact = false,
  ...props
}) => {
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
      _light={{
        bgColor: "gray.100",
        borderColor: "gray.300",
      }}
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
          <Username username={d.username} discriminator={d.discriminator} />
          <Hr w={52} />
          <UserFlagsRow
            default={<></>}
            bitfield={d.flags!}
            nitro={d.premium_type!}
            boxSize="1.3em"
          />
          <Text mb={1}>{d.bio || "No bio"}</Text>
        </Flex>
      ) : (
        <Flex direction="column" justify="flex-start" align="center">
          <Username username={d.username} discriminator={d.discriminator} />
          <Hr mb={0} />
          <EditableUserFlags d={d} default="No flags" />
          <Hr mt={1} />
          <Text mb={1}>{d.bio || "No bio"}</Text>
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
