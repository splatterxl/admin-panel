import { Heading, Link, Text } from "@chakra-ui/react"
import type { NextPage } from "next"
import NextLink from "next/link"
import { Counts } from "../components/homepage/counts/Counts"
import { Navbar } from "../components/layout/navbar/Navbar"
import CurrentUserStore from "../stores/CurrentUserStore"
import { Endpoints } from "../util/constants"
import { greeting } from "../util/greeting"

// TODO: homepage
const Home: NextPage = () => {
  const currentUser = CurrentUserStore.useValue()

  return (
    <>
      <Navbar>
        <Heading size="lg" fontFamily="normal">
          Good {greeting()}, {currentUser.username}!
        </Heading>
      </Navbar>
    </>
  )
}

export default Home
