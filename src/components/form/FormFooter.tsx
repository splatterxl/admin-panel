import { Box } from "@chakra-ui/react"

export default function FormFooter({ children, br }: FormFooterProps) {
  return <Box width="full">{children}</Box>
}

interface FormFooterProps {
  children: React.ReactNode
  br?: number
}
