import { Heading } from "@chakra-ui/react"
import type { NextPage } from "next"
import { InternalServers } from "../components/homepage/servers/InternalServers"
import { Navbar } from "../components/layout/navbar/Navbar"
import { Section } from "../components/layout/section/Section"
import { SectionContainer } from "../components/layout/section/SectionContainer"
import { Link } from "../components/Link"
import CurrentUserStore from "../stores/CurrentUserStore"
import { Endpoints } from "../util/constants"

// TODO: homepage
const Home: NextPage = () => {
  const currentUser = CurrentUserStore.useValue()

  return (
    <>
      <Navbar>
        <Heading size="md">Welcome back, {currentUser.username}</Heading>
      </Navbar>
      <SectionContainer>
        <InternalServers />
      </SectionContainer>
    </>
  )
}

export default Home
