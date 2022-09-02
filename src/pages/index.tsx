import { Heading } from "@chakra-ui/react"
import type { NextPage } from "next"
import { Navbar } from "../components/layout/navbar/Navbar"
import CurrentUserStore from "../stores/CurrentUserStore"

// TODO: homepage
const Home: NextPage = () => {
  const currentUser = CurrentUserStore.useValue()

  return (
    <>
      <Navbar>
        <Heading size="md">Welcome back, {currentUser.username}</Heading>
      </Navbar>
    </>
  )
}

export default Home
