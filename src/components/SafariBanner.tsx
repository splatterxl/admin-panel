import { Box, Center } from "@chakra-ui/react"
import React from "react"

export const SafariBanner = () => {
  const [isSafari, setSafari] = React.useState(false)

  React.useEffect(() => {
    setSafari(testSafari())
  }, [])

  if (!isSafari) return null

  return (
    <Center width="full" bgColor="rgba(255, 206, 0, 1)" color="black" p={2}>
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
    </Center>
  )
}

export const testSafari = () =>
  /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
