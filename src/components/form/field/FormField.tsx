import { Box, FormControl } from "@chakra-ui/react"
import React, {
  ChangeEvent,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"
import createAutocompleteString from "../autocomplete/createAutocompleteString"
import type { FormInputAutocomplete } from "../autocomplete/FormInputAutocompleteTypes"
import { useFormContext, validateField } from "../Form"
import { SchemaValidator } from "../validate"
import FormLabel from "./FormLabel"

const Context = createContext<FormFieldContext>(null as any)

export function useFormFieldContext() {
  return useContext(Context)
}

interface FormFieldContext {
  id: string
  placeholder?: string
  required?: boolean
  value: string
}

export default function FormField<
  Component extends React.ComponentType,
  Props = React.ComponentProps<Component>
>(props: FormFieldProps<Component, Props>) {
  const context = useFormContext(),
    fieldData = context.fields[props.id],
    [hasRegistered, setHasRegistered] = useState(false),
    [value, setValue] = useState(props.defaultValue || "")

  useEffect(() => {
    if (!hasRegistered) {
      setHasRegistered(true)

      context.setField(props.id, props.defaultValue ?? "", {
        required: props.required,
        validate: props.validate,
        schema: props.schema,
      })
    }

    if (props.error) {
      context.setFieldError(props.id, props.error)
    }
  }, [
    props.id,
    props.defaultValue,
    props.required,
    props.validate,
    props.schema,
    props.error,
  ])

  if (!props.as) {
    throw new Error("FormField must have an `as` prop")
  }

  const err = fieldData?.error

  return (
    <FormControl
      isDisabled={props.disabled}
      isInvalid={!!fieldData?.error}
      marginTop={0}
    >
      <Context.Provider
        value={{
          id: props.id,
          placeholder: props.placeholder,
          required: props.required,
          value,
        }}
      >
        {props.label && <FormLabel for={props.id} text={props.label} />}
        {/* @ts-ignore */}
        <props.as
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            context.handleChange(event, props.id)
            setValue(event.target.value)

            if (fieldData?.error) {
              const error = validateField({
                data: fieldData,
                key: props.id,
                value: event.target.value,
                i18n: context.i18n,
              })

              context.setFieldError(props.id, error)
            }
          }}
          defaultValue={props.defaultValue}
          value={context.values[props.id]}
          placeholder={props.placeholder /* ?? props.label */}
          autocomplete={
            props.autocomplete && createAutocompleteString(props.autocomplete)
          }
          {...props.inputProps}
        />
        {err ? (
          <Box
            as="span"
            color="red.500"
            fontSize="sm"
            marginTop={2}
            marginLeft={1}
          >
            {err}
          </Box>
        ) : null}
        {props.children}
      </Context.Provider>
    </FormControl>
  )
}

interface FormFieldProps<
  Component extends React.ComponentType,
  ComponentProps
> {
  id: string
  children?: React.ReactNode
  label?: string
  error?: string | null
  placeholder?: string
  defaultValue?: string
  autocomplete?: FormInputAutocomplete
  required?: boolean
  disabled?: boolean
  validate?: (value: string) => void
  schema?: SchemaValidator
  as: Component
  inputProps?: Component extends React.ComponentType<infer P>
    ? P
    : ComponentProps
}
