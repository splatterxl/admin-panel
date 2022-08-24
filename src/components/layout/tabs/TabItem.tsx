import { Flex, Heading, Link } from "@chakra-ui/react"
import NextLink from "next/link"
import React from "react"

export const TabItem: React.FC<{
  label: string
  href: string
  icon: React.ComponentType
  selected: boolean
}> = ({ label, href, icon: Icon, selected }) => {
  return (
    <NextLink href={href} passHref={false}>
      <Link
        _hover={{
          textDecoration: "none",
        }}
      >
        <Flex
          pt={4}
          px={8}
          w={56}
          direction="row"
          justify="flex-start"
          align="center"
          gap={2}
          cursor="pointer"
          _dark={{
            color: !selected ? "whiteAlpha.700" : "white",
          }}
        >
          {/* @ts-ignore shut up ts */}
          <Icon boxSize="1.2em" />
          <Heading as="span" size="md" textAlign="left" userSelect="none">
            {label}
          </Heading>
        </Flex>
      </Link>
    </NextLink>
  )
}
