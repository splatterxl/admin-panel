import { useColorMode } from "@chakra-ui/react"
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
import { FullscreenSpinner } from "../../components/layout/FullscreenSpinner"
import AuthStore from "../../stores/AuthStore"
import CurrentUserStore from "../../stores/CurrentUserStore"
import { Endpoints } from "../../util/constants"
import { one } from "../../util/one"
import { login } from "../../util/routes/auth"

export default function Login() {
  const [error, setError] = React.useState<string>(""),
    setAuth = AuthStore.useSetInStorage(),
    auth = AuthStore.useValue(),
    setCurrentUser = CurrentUserStore.useSetInStorage(),
    { setColorMode } = useColorMode()

  const router = useRouter(),
    next = one(router.query.next)

  const [loaded, setLoaded] = React.useState(false)

  React.useEffect(() => {
    if (auth) {
      if (next) router.replace(next)
      else router.replace(Endpoints.HOME)
    } else {
      setLoaded(true)
    }
  }, [next, router])

  if (!loaded) {
    return <FullscreenSpinner />
  }

  return (
    <FullscreenCard>
      <Form
        id="login"
        mt={1}
        mb={0}
        px={{
          base: 4,
          sm: 0,
        }}
        i18n={{
          submit: "Continue",
        }}
        onSubmit={async (data) => {
          try {
            const { theme, user, token } = await login(data as any)

            setColorMode(theme)
            setCurrentUser(user)
            setAuth(token)

            // I don't know why this is needed but everything breaks without it
            setTimeout(
              () =>
                router.push(next ?? Endpoints.HOME, next ?? Endpoints.HOME, {
                  shallow: false,
                }),
              1e2
            )
          } catch (e) {
            setError(new String(e) as string)
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
            error={error}
          />
          <FormField
            as={PasswordInput}
            id="password"
            label="Password"
            autocomplete={{
              type: FormInputAutocompleteTypes.CURRENT_PASSWORD,
            }}
            required
            error={error}
          />
        </FormBody>
      </Form>
    </FullscreenCard>
  )
}
