import { Box, FormLabel as ChakraFormLabel } from "@chakra-ui/react"
import { useFormContext } from "../Form"
import { useFormFieldContext } from "./FormField"

export default function FormLabel(props: FormLabelProps) {
  const context = useFormContext(),
    fieldContext = useFormFieldContext()

  return (
    <Box
      as="span"
      mb={0}
      w="full"
      display={props.hidden ? "none" : undefined}
      aria-hidden={false}
    >
      <ChakraFormLabel
        htmlFor={`${context.id}-${props.for}`}
        marginBottom={0.5}
        display={props.hidden ? "none" : undefined}
        aria-hidden={false}
      >
        {props.text}
      </ChakraFormLabel>
    </Box>
  )
}

interface FormLabelProps {
  for: string
  text: string
  hidden?: boolean
}
