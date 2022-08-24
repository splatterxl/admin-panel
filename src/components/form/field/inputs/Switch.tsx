import { Box, HStack, Switch, SwitchProps, Text } from "@chakra-ui/react"
import { css } from "@emotion/react"
import React from "react"
import { useFormContext } from "../../Form"
import { useFormFieldContext } from "../FormField"

export const SwitchInput: React.FC<
  SwitchProps & {
    // this is a hack to actually get a label instead of it being passed to a <FormLabel /> :husk:
    placeholder?: string
    icon?: React.ReactNode
    set?: boolean
  }
> = ({ placeholder: label, icon, set = false }) => {
  const context = useFormFieldContext(),
    formContext = useFormContext()

  return (
    <HStack justify="space-between">
      <HStack as="label" htmlFor={`${formContext.id}-${context.id}`}>
        <Box>{icon}</Box>
        <Text as="span">{label}</Text>
      </HStack>
      <Switch
        onChange={(event) => {
          formContext.setField(context.id, event.target.checked.toString())
        }}
        id={`${formContext.id}-${context.id}`}
        colorScheme="green"
        css={css`
          & > span[data-checked],
          & > span[aria-checked="true"] {
            background: var(--chakra-colors-green-600);
          }
        `}
        defaultChecked={set}
      />
    </HStack>
  )
}
