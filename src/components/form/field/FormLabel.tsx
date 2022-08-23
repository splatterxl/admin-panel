import {
  Box,
  FormLabel as ChakraFormLabel,
  RequiredIndicator,
} from "@chakra-ui/react";
import { css } from "@emotion/react";
import { useFormContext } from "../Form";
import { useFormFieldContext } from "./FormField";

export default function FormLabel(props: FormLabelProps) {
  const context = useFormContext(),
    fieldContext = useFormFieldContext();

  return (
    <Box as="span" mb={0} w="full">
      <ChakraFormLabel
        htmlFor={`${context.id}-${props.for}`}
        marginBottom={0.5}
      >
        {props.text}
      </ChakraFormLabel>
    </Box>
  );
}

interface FormLabelProps {
  for: string;
  text: string;
  // this field isn't sent, it's kept for if we decide to redesign errors to be in labels again
  error?: string | null;
}
