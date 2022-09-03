import { Heading } from "@chakra-ui/react"
import { InternalServers } from "../../components/homepage/servers/InternalServers"
import { Navbar } from "../../components/layout/navbar/Navbar"

export default function InternalGuilds() {
  return (
    <>
      <Navbar>
        <Heading size="md">Internal Servers</Heading>
      </Navbar>
      <InternalServers noHeading />
    </>
  )
}
