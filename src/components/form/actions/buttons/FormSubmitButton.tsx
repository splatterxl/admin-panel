import { ButtonProps } from "@chakra-ui/react"
import { PrimaryButton } from "../../../PrimaryButton"

export default function FormSubmitButton({
  loading,
  i18n,
  hasCancel,
  ...props
}: FormSubmitButtonProps) {
  return (
    <PrimaryButton
      type="submit"
      isLoading={loading}
      borderRadius="0.25rem"
      width="full"
      {...props}
    >
      {i18n ?? "Submit"}
    </PrimaryButton>
  )
}

interface FormSubmitButtonProps extends ButtonProps {
  loading?: boolean
  i18n?: string
  hasCancel: boolean
}
