import { ColorModeScript } from "@chakra-ui/react"
import { Head, Html, Main, NextScript } from "next/document"

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="icon" href="/assets/patchcord/patchcord.png" />
      </Head>
      <body
        style={{
          transitionProperty: "all",
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
          transitionDuration: "150ms",
        }}
      >
        <ColorModeScript initialColorMode="dark" />

        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
