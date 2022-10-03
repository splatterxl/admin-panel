import { HStack, Icon, IconButton, Text } from "@chakra-ui/react"
import React from "react"
import { MdClose } from "react-icons/md"
import Store from "../stores/Store"
import { GhostButtonProps } from "./GhostButton"

const store = new (class extends Store<boolean> {
  constructor() {
    super(false, "safari_banner", true)
  }
})()

export const SafariBanner = () => {
  const [isSafari, setSafari] = React.useState(false)

  const hasDismissedBanner = store.useValue(),
    setDismissed = store.useSetInStorage()

  React.useEffect(() => {
    setSafari(testSafari())
  }, [])

  if (!isSafari || hasDismissedBanner) return null

  return (
    <HStack
      width="full"
      justify="space-between"
      align="center"
      bgColor="rgba(255, 206, 0, 1)"
      color="black"
      p={2}
    >
      <Text pl={2}>
        Unfortunately, Safari is not supported in this site. Please upgrade
        to&nbsp;
        <a href="https://chrome.google.com">
          <u>Chrome</u>
        </a>
        &nbsp;or&nbsp;
        <a href="https://firefox.com">
          <u>Firefox</u>
        </a>
        , or don&apos;t report bugs from this browser.
      </Text>
      <IconButton
        {...GhostButtonProps}
        size="sm"
        aria-label="Close"
        icon={<Icon as={MdClose} fill="black" />}
        onClick={() => {
          setDismissed(true)
        }}
      />
    </HStack>
  )
}

export const testSafari = () =>
  /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
