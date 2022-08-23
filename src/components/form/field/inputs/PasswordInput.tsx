import {
  Button,
  Icon,
  InputGroup,
  InputRightElement,
  useFormControlContext,
} from "@chakra-ui/react";
import { css } from "@emotion/react";
import { useState } from "react";
import { GrFormViewHide, GrFormView } from "react-icons/gr";
import TextInput, { TextInputProps } from "./TextInput";

export default function PasswordInput(props: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false),
    { isDisabled } = useFormControlContext();

  return (
    <InputGroup>
      <TextInput secret={!showPassword} _isDisabled={isDisabled} {...props} />
      <InputRightElement>
        <Button
          variant="ghost"
          type="button"
          opacity={isDisabled ? 0.5 : 1}
          onClick={() => {
            if (!isDisabled) setShowPassword(!showPassword);
          }}
          cursor={isDisabled ? "not-allowed" : "pointer"}
          tabIndex={isDisabled ? -1 : undefined}
          _hover={{
            bg: "transparent",
          }}
          _active={{
            bg: "transparent",
          }}
          aria-label={!showPassword ? "Show Password" : "Hide Password"}
        >
          <Icon
            as={showPassword ? GrFormView : GrFormViewHide}
            css={css`
              & path {
                stroke: currentColor;
              }
            `}
            stroke="currentcolor"
            boxSize="1.2em"
          />
        </Button>
      </InputRightElement>
    </InputGroup>
  );
}

export interface PasswordInputProps extends TextInputProps {}
