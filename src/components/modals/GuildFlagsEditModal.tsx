import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react"
import { APIGuild, GuildFeature } from "discord-api-types/v10"
import FocusedGuildStore from "../../stores/FocusedGuildStore"
import {
  editGuildFeatures,
  FEATURE_MAP,
} from "../../util/routes/guilds/features"
import FormField from "../form/field/FormField"
import { SwitchInput } from "../form/field/inputs/Switch"
import Form from "../form/Form"
import FormBody from "../form/FormBody"
import FormHeading from "../form/FormHeading"

export const GuildFlagsEditModal: React.FC<{
  onUpdate(newFlags: number): void
  onClose(): void

  open: boolean
}> = ({ onClose: close, open }) => {
  const [guild, setGuild] = FocusedGuildStore.useState(),
    features = guild!.features

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
          id={`edit_features_${guild!.id}`}
          onSubmit={async (values) => {
            const finalValues = Object.entries(values)
              .filter(([key, value]) =>
                value === ""
                  ? guild!.features.includes(key as GuildFeature)
                  : value === "true"
              )
              .map(([key]) => key)

            await editGuildFeatures(guild!.id, finalValues)

            setGuild((curr) => ({ ...curr, features: finalValues } as APIGuild))

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
            <FormHeading.Title size="lg">Edit features</FormHeading.Title>
            <FormHeading textAlign="center">
              Exercise caution when applying features as they may have
              unintended side effects.
            </FormHeading>
          </FormHeading>
          <FormBody mb={3}>{getFeatureComponents(features)}</FormBody>
        </Form>
      </ModalContent>
    </Modal>
  )
}

const getFeatureComponents = (features: GuildFeature[]) => {
  return Object.entries(FEATURE_MAP).map(([id, { label }]) => {
    return (
      <FormField
        as={SwitchInput}
        id={id}
        placeholder={label}
        inputProps={{ set: features.includes(id as GuildFeature) }}
        key={id}
      />
    )
  })
}
