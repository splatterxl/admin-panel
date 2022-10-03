import { Box, BoxProps, Flex, FlexProps } from "@chakra-ui/react"
import Link from "next/link"
import React from "react"
import { Endpoints } from "../../../util/constants"
import { User } from "../../../util/routes/types"
import { EditableUserFlags } from "../flags/EditableUserFlags"
import { UserAvatar } from "../UserAvatar"
import { UserFlagsRow } from "../UserFlags"
import { Username } from "../Username"
import { UserBio } from "./UserBio"

export const Hr: React.FC<BoxProps> = (props) => (
  <Box
    as="hr"
    width="60%"
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
      <UserAvatar
        width={compact ? 16 : 20}
        id={d.id}
        hash={d.avatar}
        discriminator={parseInt(d.discriminator)}
        alt={d.username}
      />
      <Flex
        direction="column"
        justify="flex-start"
        align={compact ? "flex-start" : "center"}
        width={!compact ? "full" : "fit-content"}
        as="section"
      >
        <Username
          username={d.username}
          discriminator={d.discriminator}
          isBot={!!d.bot}
          id={d.id}
        />
        <Hr mb={+compact} width={compact ? 52 : "60%"} />
        <UserFlagsRow
          bitfield={d.flags!}
          nitro={d.premium_type!}
          default={<></>}
          compact
        />
        {!compact ? <Hr mt={1} /> : null}
        <UserBio bio={d.bio} compact={compact} />
      </Flex>
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
