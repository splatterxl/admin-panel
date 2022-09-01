import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import type { AppProps } from "next/app"
import Head from "next/head"
import { RecoilRoot } from "recoil"
import { Tabs } from "../components/layout/Container"
import { AuthProvider } from "../providers/AuthProvider"
import { SearchTypeProvider } from "../providers/SearchTypeProvider"
import "../styles/globals.css"
import { THEME } from "../util/constants"

function PatchcordAdmin({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Head>
        <title>Patchcord</title>
      </Head>
      <ChakraProvider theme={extendTheme(THEME)}>
        <AuthProvider>
          <Tabs>
            <SearchTypeProvider>
              <Component {...pageProps} />
            </SearchTypeProvider>
          </Tabs>
        </AuthProvider>
      </ChakraProvider>
    </RecoilRoot>
  )
}

export default PatchcordAdmin
