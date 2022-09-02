import { ColorModeScript } from "@chakra-ui/react"
import { Head, Html, Main, NextScript } from "next/document"

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="icon" href="/assets/patchcord/patchcord.png" />
      </Head>
      <body>
        <ColorModeScript initialColorMode="dark" />

        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
