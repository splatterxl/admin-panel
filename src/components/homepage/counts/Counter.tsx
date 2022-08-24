import { Heading, Text, VStack } from "@chakra-ui/react"
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"

export const Counter: React.FC<{
  label: string
  value: number
  href?: string
}> = ({ label, value, href }) => {
  const router = useRouter()

  return (
    <Link href={href ?? router.pathname} as={href ?? router.asPath}>
      <a>
        <VStack
          px={4}
          py={2}
          minW={28}
          cursor="pointer"
          borderRadius="lg"
          borderWidth={1}
          _dark={{ bgColor: "gray.700" }}
          _light={{
            bgColor: "gray.200",
            borderColor: "gray.400",
          }}
        >
          <Heading as="span">{value}</Heading>
          <Text as="h3">{label}</Text>
        </VStack>
      </a>
    </Link>
  )
}
