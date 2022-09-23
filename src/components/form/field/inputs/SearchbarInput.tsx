import {
  Button,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react"
import { AiOutlineSearch } from "react-icons/ai"
import { themed } from "../../../../util/constants"
import { useFormContext } from "../../Form"
import TextInput, { TextInputProps } from "./TextInput"

export default function SearchbarInput(props: TextInputProps) {
  const context = useFormContext()

  return (
    <InputGroup>
      <TextInput fontFamily="normal" {...props} />
      <InputRightElement pr={3}>
        <Button
          variant="ghost"
          type="submit"
          isLoading={context.loading}
          onClick={() => {
            context.submit()
          }}
          hidden
        >
          Search
        </Button>
      </InputRightElement>
    </InputGroup>
  )
}
