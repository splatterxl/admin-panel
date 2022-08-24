import { Flex, Heading, Link } from "@chakra-ui/react"
import type { NextPage } from "next"
import NextLink from "next/link"
import { Counts } from "../components/homepage/counts/Counts"
import { RecentlyViewedUsers } from "../components/homepage/recently/RecentlyViewedUsers"
import CurrentUserStore from "../stores/CurrentUserStore"
import { Endpoints } from "../util/constants"
import { greeting } from "../util/greeting"

// TODO: homepage
const Home: NextPage = () => {
  const currentUser = CurrentUserStore.useValue()

  return (
    <>
      <Heading as="h1" size="xl">
        Good {greeting()},{" "}
        <NextLink href={Endpoints.USER(currentUser.id)} passHref>
          <Link>{currentUser.username}</Link>
        </NextLink>
        !
      </Heading>
      <Counts />
    </>
  )
}

export default Home
