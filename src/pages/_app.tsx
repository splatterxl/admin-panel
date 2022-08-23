import { ChakraProvider } from "@chakra-ui/react"
import type { AppProps } from "next/app"
import { RecoilRoot } from "recoil"
import { ThemeToggle } from "../components/ThemeToggle"
import { AuthProvider } from "../providers/AuthProvider"
import "../styles/globals.css"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ChakraProvider>
        <ThemeToggle />
        <AuthProvider>
            <Component {...pageProps} />
        </AuthProvider>
      </ChakraProvider>
    </RecoilRoot>
  )
}

export default MyApp
