import { Flex, Heading, Link } from "@chakra-ui/react"
import type { NextPage } from "next"
import NextLink from "next/link"
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
      <Flex direction="column" justify="flex-start" align="flex-start">
        <Flex direction="column" justify="flex-start" align="flex-start">
          <Heading as="h2" size="md" fontStyle="italic">
            Jump back in...
          </Heading>
          <RecentlyViewedUsers />
        </Flex>
      </Flex>
    </>
  )
}

export default Home
