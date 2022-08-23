import {
  Box,
  BoxProps,
  Heading,
  HeadingProps,
  Text,
  TextProps,
} from "@chakra-ui/react"
import { useFormContext } from "./Form"

export default function FormHeading(props: BoxProps) {
  return (
    <Box px={0} pb={3} width="full" {...props}>
      {props.children}
    </Box>
  )
}

FormHeading.Title = function Title(props: HeadingProps) {
  return <Heading fontWeight={900} textAlign="center" width="full" {...props} />
}

FormHeading.Error = function Error(props: Omit<TextProps, "children">) {
  const { error } = useFormContext()

  if (!error) return null

  return (
    <Text
      fontSize="sm"
      color="red.300"
      marginBottom={1.5}
      textAlign="center"
      width="full"
      {...props}
    >
      {error.toString?.() ?? error}
    </Text>
  )
}

FormHeading.Description = function Description(props: TextProps) {
  return (
    <Text
      marginBottom={0}
      marginX={2}
      fontWeight={400}
      fontSize="1.1rem"
      textAlign="center"
      width="full"
      {...props}
    />
  )
}
