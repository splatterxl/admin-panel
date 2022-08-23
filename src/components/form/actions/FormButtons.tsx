import { Flex } from "@chakra-ui/react";
import { useFormContext } from "../Form";
import FormCancelButton from "./buttons/FormCancelButton";
import FormSubmitButton from "./buttons/FormSubmitButton";

export default function FormButtons(props: FormButtonsProps) {
  const {
    actions: { cancel },
    i18n: { submit },
  } = useFormContext();

  return (
    <Flex
      align="center"
      justifyContent={cancel ? "space-between" : "center"}
      flexDir="column"
      width={cancel ? "auto" : "full"}
    >
      <FormSubmitButton
        loading={props.loading}
        i18n={submit}
        hasCancel={!!cancel}
      />
      {cancel ? <FormCancelButton /> : null}
    </Flex>
  );
}

interface FormButtonsProps {
  loading?: boolean;
}
