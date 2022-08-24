import { Modal, ModalContent, ModalOverlay } from "@chakra-ui/react"
import { Snowflake } from "discord-api-types/globals"
import React from "react"
import FocusedUserStore from "../../stores/FocusedUserStore"
import { PatchcordRoutes } from "../../util/constants"
import http from "../../util/http"
import { User } from "../../util/types"
import FormField from "../form/field/FormField"
import { SwitchInput } from "../form/field/inputs/Switch"
import Form from "../form/Form"
import FormBody from "../form/FormBody"
import FormHeading from "../form/FormHeading"
import { FLAGS } from "../user/flags/UserFlags"

export const FLAG_MAP = Object.fromEntries(
  Object.entries(FLAGS).map(([value, [icon, label, id]]) => [
    id,
    { label, value: parseInt(value), icon },
  ])
)

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
      <ModalContent>
        <Form
          id={`edit_flags_${user!.id}`}
          onSubmit={async (values) => {
            const newBitfield = keyObjectToBitfield(values as any, bitfield)

            await editUserFlags(user!.id, newBitfield)

            setUser((curr) => ({ ...curr, flags: newBitfield } as User))

            close()
          }}
          i18n={{
            submit: "Apply",
          }}
          submitProps={{
            m: 4,
          }}
          px={6}
          pt={6}
          pb={4}
        >
          <FormHeading p={4}>
            <FormHeading.Title size="lg">Edit flags</FormHeading.Title>
            <FormHeading textAlign="center">
              Exercise caution when applying flags as they may have unintended
              side effects.
            </FormHeading>
          </FormHeading>
          <FormBody>{getFlagComponents(bitfield)}</FormBody>
        </Form>
      </ModalContent>
    </Modal>
  )
}

export const editUserFlags = async (id: Snowflake, flags: number) => {
  const res = await http.patch(PatchcordRoutes.USER(id), {
    flags: flags.toString(),
  })

  if (!res.ok) throw new Error(`could not apply flags: ${res.err?.message}`)
}

const getFlagComponents = (bitfield: number) => {
  return Object.entries(FLAG_MAP)
    .map(([id, { label, value, icon: Icon }]) => {
      return (
        <FormField
          as={SwitchInput}
          id={id}
          placeholder={label}
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

export function keyObjectToBitfield(
  keyObj: Record<keyof typeof FLAG_MAP, `${boolean}`>,
  initial: number
) {
  let bitfield = 0

  for (const [K, V] of Object.entries(keyObj)) {
    const value = FLAG_MAP[K].value,
      isSet = V ? Boolean(V) : (initial & value) === value

    if (isSet) {
      bitfield |= value
    }
  }

  return bitfield
}
