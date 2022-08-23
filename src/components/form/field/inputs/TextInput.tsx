import { Input, type InputProps } from "@chakra-ui/react";
import { useFormContext } from "../../Form";
import { useFormFieldContext } from "../FormField";

export default function TextInput({
  secret,
  inputRef,
  autocomplete,
  _isDisabled,
  ...props
}: TextInputProps) {
  const context = useFormFieldContext(),
    formContext = useFormContext();

  return (
    <Input
      ref={inputRef}
      type={secret ? "password" : "text"}
      name={`${formContext.id}-${context.id}`}
      variant="outline"
      borderRadius="0.3em"
      _light={{
        borderColor: "blackAlpha.500",
      }}
      _dark={{
        borderColor: "whiteAlpha.300",
      }}
      _hover={{
        _light: {
          borderColor: "blackAlpha.600",
        },
        _dark: {
          borderColor: "whiteAlpha.400",
        },
      }}
      _focusVisible={{
        _light: {
          borderColor: "blackAlpha.700",
        },
        _dark: {
          borderColor: "whiteAlpha.500",
        },
      }}
      autoComplete={autocomplete ? autocomplete : undefined}
      aria-required={context.required}
      userSelect={_isDisabled ? "none" : undefined}
      {...props}
    />
  );
}

export interface TextInputProps extends InputProps {
  secret?: boolean;
  inputRef?: React.Ref<HTMLInputElement>;
  autocomplete?: string;
  _isDisabled?: boolean;
}
