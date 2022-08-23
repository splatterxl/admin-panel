import { Heading } from "@chakra-ui/react"
import type { NextPage } from "next"
import { Fullscreen } from "../components/layout/Fullscreen"
import CurrentUserStore from "../stores/CurrentUserStore"
import { greeting } from "../util/greeting"

// TODO: homepage
const Home: NextPage = () => {
  const currentUser = CurrentUserStore.useValue()

  return (
    <Fullscreen>
      <Heading as="h1" size="lg">
        Good {greeting()}, {currentUser.username}
      </Heading>
    </Fullscreen>
  )
}

export default Home
