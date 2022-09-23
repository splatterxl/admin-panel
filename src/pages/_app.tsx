import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import type { AppProps } from "next/app"
import Head from "next/head"
import { RecoilRoot } from "recoil"
import { Container } from "../components/layout/Container"
import { AuthProvider } from "../providers/AuthProvider"
import { PersistentStoreProvider } from "../providers/PersistentStoreProvider"
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
          <SearchTypeProvider>
            <PersistentStoreProvider>
              <Container>
                <Component {...pageProps} />
              </Container>
            </PersistentStoreProvider>
          </SearchTypeProvider>
        </AuthProvider>
      </ChakraProvider>
    </RecoilRoot>
  )
}

export default PatchcordAdmin
