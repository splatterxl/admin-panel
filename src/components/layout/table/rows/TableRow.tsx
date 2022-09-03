import { HStack, Text, TextProps } from "@chakra-ui/react"
import { Theme, themed } from "../../../../util/constants"

export const TableRow: React.FC<
  {
    icon?: React.ReactNode
    children: React.ReactNode
    actions?: React.ReactNode
  } & TextProps
> = ({ icon = null, children, actions = null, ...props }) => {
  return (
    <HStack w="full" {...themed(Theme.bgSecondary)} p={2}>
      {icon}
      <Text as="span" {...props}>
        {children}
      </Text>
      {actions}
    </HStack>
  )
}
