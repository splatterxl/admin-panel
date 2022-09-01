import { Flex, Heading, Icon, Link } from "@chakra-ui/react"
import NextLink from "next/link"
import React from "react"
import { IconType } from "react-icons"

export const TabItem: React.FC<{
  label: string
  href: string
  icon: IconType
  selected?: boolean
}> = ({ label, href, icon, selected }) => {
  return (
    <NextLink href={href} passHref>
      <Link
        _hover={{
          textDecoration: "none",
        }}
        mt={0}
        w="full"
      >
        <Flex
          as="button"
          direction="row"
          justify="flex-start"
          align="center"
          gap={1}
          cursor="pointer"
          opacity={!selected ? 0.7 : 1}
          _hover={{
            opacity: !selected ? 0.7 : 0.9,
          }}
          w="full"
        >
          <Icon as={icon} boxSize="1.2em" />
          <Heading
            as="span"
            size="sm"
            fontWeight={600}
            fontFamily="Whitney"
            lineHeight={1}
            textAlign="left"
            userSelect="none"
          >
            {label}
          </Heading>
        </Flex>
      </Link>
    </NextLink>
  )
}
