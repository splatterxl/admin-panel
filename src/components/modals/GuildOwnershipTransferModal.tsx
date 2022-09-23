import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react"
import { Snowflake } from "discord-api-types/globals"
import { themed } from "../../util/constants"
import { getGuild, transferOwnership } from "../../util/routes/guilds"
import { getUser } from "../../util/routes/users"
import FormField from "../form/field/FormField"
import TextInput from "../form/field/inputs/TextInput"
import Form from "../form/Form"
import FormBody from "../form/FormBody"
import FormHeading from "../form/FormHeading"

export const GuildOwnershipTransferModal: React.FC<{
  id: Snowflake
  isOpen: boolean
  onClose: () => void
  apply: (id: Snowflake) => void
}> = ({ id, isOpen, onClose, apply }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent {...themed("bgColor", "primary")}>
        <ModalCloseButton />
        <ModalBody>
          <Form
            id="transfer_ownership"
            onSubmit={async ({ id: userId }) => {
              try {
                await getUser(userId)
              } catch {
                throw "Unknown user"
              }

              const guild = await getGuild(id)

              if (guild.owner_id === userId) {
                onClose()
                return
              } else {
                await transferOwnership(id, userId)
                apply(userId)
              }
            }}
            i18n={{
              submit: "Transfer",
            }}
            submitProps={{
              mt: 4,
              mb: 8,
              my: 0,
            }}
            px={6}
            pt={6}
            pb={4}
          >
            <FormHeading>
              <FormHeading.Title>Transfer Ownership</FormHeading.Title>
              <FormHeading.Description>
                WARNING: This is a dangerous and potentially destructive action.
              </FormHeading.Description>
            </FormHeading>
            <FormBody>
              <FormField id="id" as={TextInput} placeholder="New owner ID" />
              <FormHeading.Error mt={0} width="full" textAlign="left" />
            </FormBody>
          </Form>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
