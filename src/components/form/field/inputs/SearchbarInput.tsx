import {
  Button,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react"
import { AiOutlineSearch } from "react-icons/ai"
import { useFormContext } from "../../Form"
import TextInput, { TextInputProps } from "./TextInput"

export default function SearchbarInput(props: TextInputProps) {
  const context = useFormContext()

  return (
    <InputGroup>
      <TextInput {...props} />
      <InputRightElement pr={3}>
        <Button
          variant="ghost"
          type="submit"
          isLoading={context.loading}
          onClick={() => {
            context.submit()
          }}
          aria-label="Search"
          bgColor="transparent"
          _hover={{
            bgColor: "transparent",
          }}
          _active={{
            bgColor: "transparent",
          }}
        >
          <Icon as={AiOutlineSearch} aria-hidden="true" />
        </Button>
      </InputRightElement>
    </InputGroup>
  )
}
