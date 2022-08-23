import { Button } from "@chakra-ui/react";
import { useFormContext } from "../../Form";

export default function FormCancelButton() {
  const {
    actions: { cancel },
    i18n: { cancel: cancelString = "CANCEL" },
  } = useFormContext();

  return (
    <Button
      variant="ghost"
      size="xs"
      borderRadius="md"
      fontSize="smaller"
      onClick={() => {
        cancel!();
      }}
      _hover={{
        bg: "transparent",
      }}
      _active={{
        bg: "transparent",
      }}
      width="full"
    >
      {cancelString}
    </Button>
  );
}
