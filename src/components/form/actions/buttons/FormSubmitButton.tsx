import { PrimaryButton } from "../../../PrimaryButton"

export default function FormSubmitButton(props: FormSubmitButtonProps) {
  return (
    <PrimaryButton
      type="submit"
      isLoading={props.loading}
      borderRadius="0.25rem"
      width="full"
    >
      {props.i18n ?? "Submit"}
    </PrimaryButton>
  )
}

interface FormSubmitButtonProps {
  loading?: boolean
  i18n?: string
  hasCancel: boolean
}
