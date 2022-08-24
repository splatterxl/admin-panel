import { Box, Tag, Tooltip as ChakraTooltip } from "@chakra-ui/react"
import React from "react"

// eslint-disable-next-line react/display-name
export const _TooltipCard = React.forwardRef(
  ({ children, ...rest }: any, ref) => (
    <Box as="span" mr={0.5} cursor="pointer" ref={ref as any} {...rest}>
      {children}
    </Box>
  )
)

export const Tooltip: React.FC<{
  children: React.ReactNode
  label: string
}> = ({ children, label }) => {
  return (
    <ChakraTooltip label={label} aria-label={label} placement="top">
      <_TooltipCard>{children}</_TooltipCard>
    </ChakraTooltip>
  )
}
