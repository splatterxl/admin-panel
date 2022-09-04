import { HStack, Text, TextProps } from "@chakra-ui/react";
import { themed } from "../../../../util/constants";
import { Link } from "../../../Link";

export const TableRow: React.FC<
  {
    icon?: React.ReactNode
    children: React.ReactNode
    actions?: React.ReactNode
    href?: string
  } & TextProps
> = ({ icon = null, children, actions = null, href, ...props }) => {
  return (
    <HStack
      width="full"
      {...themed('bgColor','secondary')}
      p={2}
      justify="space-between"
    >
      <HStack as={(href ? Link : undefined) as any} href={href}>
        {icon}
        <Text as="span" {...props}>
          {children}
        </Text>
      </HStack>
      {actions}
    </HStack>
  )
}
