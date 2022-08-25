import { Heading, Link, Text } from "@chakra-ui/react"
import type { NextPage } from "next"
import NextLink from "next/link"
import { Counts } from "../components/homepage/counts/Counts"
import CurrentUserStore from "../stores/CurrentUserStore"
import { Endpoints } from "../util/constants"
import { greeting } from "../util/greeting"

// TODO: homepage
const Home: NextPage = () => {
  const currentUser = CurrentUserStore.useValue()

  return (
    <>
      <Heading
        as="h1"
        size="xl"
        display="flex"
        justifyContent={{ base: "center", md: "flex-start" }}
        w={{ base: "full", md: "auto" }}
        textAlign={{
          base: "center",
          md: "left",
        }}
      >
        <Text as="span">
          Good {greeting()},{" "}
          <NextLink href={Endpoints.USER(currentUser.id)} passHref>
            <Link>{currentUser.username}</Link>
          </NextLink>
          !
        </Text>
      </Heading>
      <Counts />
    </>
  )
}

export default Home
