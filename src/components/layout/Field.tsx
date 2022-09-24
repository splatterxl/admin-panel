import { HStack, Text, VStack } from "@chakra-ui/react"
import React from "react"
import { Colors } from "../../util/constants"

export const Field: React.FC<{
  name: string
  children?: React.ReactNode
  value?: React.ReactNode
  action?: React.ReactNode
  hasLink?: boolean
}> = ({ name, children: value, value: _legacyValue, action, hasLink }) => {
  const [text, setText] = React.useState(hasLink ? null : value ?? _legacyValue)

  return (
    <VStack justify="flex-start" align="flex-start" spacing={1}>
      <HStack justify="flex-start" align="center" spacing={1}>
        <Text
          as="span"
          userSelect="none"
          textTransform="uppercase"
          fontSize="xs"
          fontWeight={750}
          lineHeight={1}
          color={Colors.TEXT_HEADER_SECONDARY_DARK}
        >
          {name}
        </Text>
        {action}
      </HStack>
      <Text as="span" lineHeight={1} fontSize="sm">
        {hasLink ? value ?? _legacyValue : text}
      </Text>
    </VStack>
  )
}
