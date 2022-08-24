import { ChakraProvider } from "@chakra-ui/react"
import type { AppProps } from "next/app"
import Head from "next/head"
import { RecoilRoot } from "recoil"
import { Tabs } from "../components/layout/tabs/Tabs"
import { Navbar } from "../components/navbar/Navbar"
import { AuthProvider } from "../providers/AuthProvider"
import { PersistentStoreProvider } from "../providers/PersistentStoreProvider"
import { SearchTypeProvider } from "../providers/SearchTypeProvider"
import "../styles/globals.css"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Head>
        <title>Patchcord</title>
      </Head>
      <ChakraProvider>
        <PersistentStoreProvider>
          <AuthProvider>
            <SearchTypeProvider>
              <Navbar />
              <Tabs>
                <Component {...pageProps} />
              </Tabs>
            </SearchTypeProvider>
          </AuthProvider>
        </PersistentStoreProvider>
      </ChakraProvider>
    </RecoilRoot>
  )
}

export default MyApp
