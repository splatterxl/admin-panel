import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react"
import { Snowflake } from "discord-api-types/globals"
import React from "react"
import { PatchcordRoutes } from "../../util/constants"
import http from "../../util/http"
import Form from "../form/Form"
import FormBody from "../form/FormBody"
import FormHeading from "../form/FormHeading"
import { FLAGS } from "../user/flags/UserFlags"

export const FLAG_MAP = new Map(
  Object.entries(FLAGS).map(([value, [, label, id]]) => [
    id,
    { label, value: parseInt(value) },
  ])
)

export const UserFlagsEditModal: React.FC<{
  bitfield: number
  id: Snowflake
  username: string

  onUpdate(newFlags: number): void
  onClose(): void

  open: boolean
}> = ({ bitfield, id, onClose: closeHandler, open }) => {
  return (
    <Modal isOpen={open} onClose={closeHandler} onCloseComplete={closeHandler}>
      <ModalOverlay />
      <ModalContent>
        <Form
          id={`edit_flags_${id}`}
          onSubmit={(values) => {
            console.log(values)
            closeHandler()
          }}
          i18n={{
            submit: "Apply",
          }}
          submitProps={{
            m: 4,
          }}
        >
          <FormHeading m={4}>
            <FormHeading.Title>Edit flags</FormHeading.Title>
            <FormHeading>
              Exercise caution when applying flags as they may have unintended
              side effects.
            </FormHeading>
          </FormHeading>
          <FormBody>unreal</FormBody>
        </Form>
      </ModalContent>
    </Modal>
  )
}

export const editUserFlags = async (id: Snowflake, flags: number) => {
  const res = await http.patch(PatchcordRoutes.USER(id), {
    flags,
  })

  if (!res.ok) throw new Error(`could not apply flags: ${res.err?.message}`)
}
