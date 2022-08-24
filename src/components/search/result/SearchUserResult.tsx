import { Box, Flex, Image, Text } from "@chakra-ui/react"
import { APIUser, CDNRoutes, RouteBases } from "discord-api-types/v10"
import Link from "next/link"
import React from "react"
import { Endpoints } from "../../../util/constants"
import { UserFlagsRow } from "../../user/UserFlags"

export const SearchUserResult: React.FC<{ d: APIUser }> = ({ d }) => {
  return (
    <Link href={Endpoints.USER(d.id)} passHref>
      <Flex
        as="a"
        width="full"
        direction="row"
        alignItems="center"
        justify="flex-start"
        paddingTop={2}
        paddingBottom={3}
        paddingX={4}
        gap={4}
        borderRadius="lg"
        borderWidth={1}
      >
        {d.avatar && (
          <Image
            src={
              // d.avatar
              //   ? cdn(CDNRoutes.userAvatar(d.id, d.avatar, ImageFormat.PNG))
              //   :
              RouteBases.cdn +
              CDNRoutes.defaultUserAvatar(
                (parseInt(d.discriminator) % 5) as any
              )
            }
            alt={d.username}
            width={20}
            borderRadius="100%"
          />
        )}
        <Flex
          as="section"
          width="full"
          direction="column"
          alignItems="flex-start"
          justify="flex-end"
        >
          <Text as="header" fontWeight={700} fontSize="4xl">
            <Text as="h2" display="inline-block">
              {d.username}
            </Text>
            <Text
              as="span"
              fontSize="2xl"
              _dark={{ color: "gray.400" }}
              _light={{
                color: "gray.600",
              }}
            >
              #{d.discriminator}
            </Text>
          </Text>
          <Box as="hr" w="full" mb={2} />
          <UserFlagsRow
            bitfield={d.flags!}
            nitro={d.premium_type!}
            boxSize="1.3em"
          />
        </Flex>
      </Flex>
    </Link>
  )
}
