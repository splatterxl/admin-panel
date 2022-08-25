import { Modal, ModalContent, ModalOverlay, ModalCloseButton } from "@chakra-ui/react"
import React from "react"
import FocusedUserStore from "../../stores/FocusedUserStore"
import { User } from "../../util/routes/types"
import {
  editUserFlags,
  FLAG_MAP,
  keyObjectToBitfield,
} from "../../util/routes/users/flags"
import FormField from "../form/field/FormField"
import { SwitchInput } from "../form/field/inputs/Switch"
import Form from "../form/Form"
import FormBody from "../form/FormBody"
import FormHeading from "../form/FormHeading"

export const UserFlagsEditModal: React.FC<{
  onUpdate(newFlags: number): void
  onClose(): void

  open: boolean
}> = ({ onClose: close, open }) => {
  const [user, setUser] = FocusedUserStore.useState(),
    bitfield = user!.flags!

  return (
    <Modal
      isOpen={open}
      onClose={close}
      onCloseComplete={close}
      isCentered={false}
    >
      <ModalOverlay />
      <ModalContent justifySelf="flex-start" marginTop={2}>
        <ModalCloseButton />
        <Form
          id={`edit_flags_${user!.id}`}
          onSubmit={async (values) => {
            const newBitfield = keyObjectToBitfield(values as any, bitfield)

            console.log(values)

            await editUserFlags(user!.id, newBitfield)

            setUser((curr) => ({ ...curr, flags: newBitfield } as User))

            close()
          }}
          i18n={{
            submit: "Apply",
          }}
          submitProps={{
            m: 4,
            mt: 0,
          }}
          px={6}
          pt={6}
          pb={4}
        >
          <FormHeading px={4} py={1}>
            <FormHeading.Title size="lg">Edit flags</FormHeading.Title>
            <FormHeading textAlign="center">
              Exercise caution when applying flags as they may have unintended
              side effects.
            </FormHeading>
          </FormHeading>
          <FormBody mb={3}>{getFlagComponents(bitfield)}</FormBody>
        </Form>
      </ModalContent>
    </Modal>
  )
}

export const getFlagComponents = (bitfield: number) => {
  return Object.entries(FLAG_MAP)
    .map(([id, { label, value, icon: Icon }]) => {
      return (
        <FormField
          as={SwitchInput}
          id={id}
          placeholder={`${label} (1 << ${Math.log2(value)})`}
          inputProps={{
            icon: <Icon />,
            set: (bitfield & value) === value,
          }}
          key={id}
        />
      )
    })
    .filter((v) => v)
}
