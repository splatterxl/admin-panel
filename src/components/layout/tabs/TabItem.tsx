import { Flex, Heading, Icon } from "@chakra-ui/react"
import NextLink from "next/link"
import React from "react"
import { THEME } from "../../../util/constants"

export const TabItem: React.FC<{
  label: string
  href: string
  icon: React.ComponentType
  selected?: boolean
}> = ({ label, href, icon, selected }) => {
  return (
    <NextLink href={href} passHref>
      <Flex
        as="a"
        _hover={{
          textDecoration: "none",
          opacity: !selected ? 0.9 : 1,
        }}
        margin={0}
        padding={0.25}
        opacity={!selected ? 0.7 : 1}
        direction="row"
        justify="flex-start"
        align="center"
        gap={2}
        w="full"
        cursor="pointer"
      >
        <Icon as={icon} boxSize="1.1em" aria-hidden />
        <Heading
          as="span"
          size="sm"
          fontWeight={500}
          fontFamily={THEME.fonts!.normal as string}
          lineHeight={1}
          textAlign="left"
          userSelect="none"
        >
          {label}
        </Heading>
      </Flex>
    </NextLink>
  )
}
