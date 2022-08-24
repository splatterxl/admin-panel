import { Flex, Icon, Text } from "@chakra-ui/react"
import { MdErrorOutline } from "react-icons/md"
import { Full } from "../../components/layout/Full"

export default function UserNotFound() {
  return (
    <Flex
      direction="column"
      justify="center"
      align="center"
      w="80%"
      pt={10}
      opacity={0.7}
    >
      <Icon as={MdErrorOutline} boxSize="2em" />
      <Text>Unknown user</Text>
    </Flex>
  )
}
