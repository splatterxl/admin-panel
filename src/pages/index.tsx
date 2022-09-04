import { Heading } from "@chakra-ui/react"
import type { NextPage } from "next"
import { SavedPages } from "../components/homepage/saved/SavedPages"
import { InternalServers } from "../components/homepage/servers/InternalServers"
import { Navbar } from "../components/layout/navbar/Navbar"
import { SectionContainer } from "../components/layout/section/SectionContainer"
import CurrentUserStore from "../stores/CurrentUserStore"

// TODO: homepage
const Home: NextPage = () => {
  const currentUser = CurrentUserStore.useValue()

  return (
    <>
      <Navbar>
        <Heading size="md">Welcome back, {currentUser.username}</Heading>
      </Navbar>
      <SectionContainer>
        <SavedPages />
        <InternalServers truncate />
      </SectionContainer>
    </>
  )
}

export default Home
