import { HStack, Text, TextProps } from "@chakra-ui/react"
import React from "react"
import { themed } from "../../../../util/constants"
import { Link } from "../../../Link"

export const TableRow: React.FC<
  {
    icon?: React.ReactNode
    title?: React.ReactNode
    children: React.ReactNode
    actions?: React.ReactNode
    href?: string
    noText?: boolean
  } & TextProps
> = ({
  icon = null,
  title = null,
  children,
  actions = null,
  href,
  noText = false,
  ...props
}) => {
  return (
    <HStack
      width="full"
      {...themed("bgColor", "secondary")}
      py={!noText ? "0.343rem" : 1}
      px={2}
      margin={0}
      justify="space-evenly"
      align="center"
      // borderBottom="1px"
      // {...themed("borderColor", "tertiary")}
    >
      <HStack
        justify="flex-start"
        align="center"
        width="full"
        as={(href ? Link : undefined) as any}
        href={href}
      >
        {icon}
        {!title && noText ? (
          children
        ) : (
          <Text as="span" fontSize="sm" {...(title ? props : {})}>
            {title ?? children}
          </Text>
        )}
      </HStack>
      {title ?? actions ? (
        <HStack
          width={title ? "full" : undefined}
          flexDirection={title ? "row" : "row-reverse"}
          justify="flex-start"
          align="center"
        >
          {title ? (
            noText ? (
              children
            ) : (
              <Text as="span" fontSize="sm" {...props}>
                {children}
              </Text>
            )
          ) : null}
          {actions}
        </HStack>
      ) : null}
    </HStack>
  )
}
