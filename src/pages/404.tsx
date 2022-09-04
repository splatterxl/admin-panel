import { Flex, Icon, Text } from "@chakra-ui/react"
import { MdErrorOutline } from "react-icons/md"
import { Navbar } from "../components/layout/navbar/Navbar"

export default function UserNotFound() {
  return (
    <>
      <Navbar />
      <Flex
        direction="column"
        justify="center"
        align="center"
        width="80%"
        pt={10}
        opacity={0.7}
      >
        <Icon as={MdErrorOutline} boxSize="2em" />
        <Text>Not found</Text>
      </Flex>
    </>
  )
}
