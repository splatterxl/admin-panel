import { useColorMode } from "@chakra-ui/react"
import { UserFlags } from "discord-api-types/v10"
import { useRouter } from "next/router"
import React from "react"
import { FormInputAutocompleteTypes } from "../../components/form/autocomplete/FormInputAutocompleteTypes"
import FormField from "../../components/form/field/FormField"
import PasswordInput from "../../components/form/field/inputs/PasswordInput"
import TextInput from "../../components/form/field/inputs/TextInput"
import Form from "../../components/form/Form"
import FormBody from "../../components/form/FormBody"
import FormHeading from "../../components/form/FormHeading"
import { FullscreenCard } from "../../components/layout/card/CardWithContainer"
import AuthStore from "../../stores/AuthStore"
import CurrentUserStore from "../../stores/CurrentUserStore"
import { Endpoints, ErrorMessages } from "../../util/constants"
import http from "../../util/http"
import { one } from "../../util/one"
import { User } from "../../util/types"

export default function Login() {
  const [errors, setErrors] = React.useState<{
      login?: string
      password?: string
    }>({}),
    [, setAuth, auth] = AuthStore.useStateFromStorage(),
    setCurrentUser = CurrentUserStore.useSetInStorage(),
    router = useRouter(),
    next = one(router.query.next),
    { setColorMode } = useColorMode()

  if (auth) {
    router.replace(next ?? Endpoints.HOME)
  }

  return (
    <FullscreenCard>
      <Form
        id="login"
        w="full"
        h="full"
        mt={1}
        mb={0}
        px={{
          base: 4,
          sm: 0,
        }}
        justify="center"
        i18n={{
          submit: "Continue",
        }}
        onSubmit={async (data) => {
          const res = await http.post<{
            token: string
            user_settings: { theme: string }
          }>("/auth/login", data)

          if (!res.ok) {
            setErrors({
              login: ErrorMessages.INVALID_CREDENTIALS,
              password: ErrorMessages.INVALID_CREDENTIALS,
            })
          } else {
            const {
              token,
              user_settings: { theme },
            } = res.data

            const { data: user } = await http.get<User>("/users/@me", "", {
              headers: {
                Authorization: token,
              },
            })

            if ((user.flags! & UserFlags.Staff) !== UserFlags.Staff) {
              setErrors({
                login: ErrorMessages.MAZE,
              })
            } else {
              setColorMode(theme)

              setCurrentUser(user)
              setAuth(token)

              router.replace(Endpoints.HOME, Endpoints.HOME, {
                shallow: false,
              })
            }
          }
        }}
      >
        <FormHeading pb={0}>
          <FormHeading.Title>Login</FormHeading.Title>
          <FormHeading.Description>
            You need to log into your Patchcord account to continue.
          </FormHeading.Description>
        </FormHeading>

        <FormBody>
          <FormField
            as={TextInput}
            id="login"
            label="Email address"
            autocomplete={{
              type: FormInputAutocompleteTypes.USERNAME,
            }}
            required
            inputProps={{
              type: "email",
            }}
            error={errors.login}
          />
          <FormField
            as={PasswordInput}
            id="password"
            label="Password"
            autocomplete={{
              type: FormInputAutocompleteTypes.CURRENT_PASSWORD,
            }}
            required
            error={errors.password}
          />
        </FormBody>
      </Form>
    </FullscreenCard>
  )
}
