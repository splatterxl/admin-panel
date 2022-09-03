import { Heading } from "@chakra-ui/react"
import { Navbar } from "../../components/layout/navbar/Navbar"
import { SearchType } from "../../stores/SearchTypeStore"
import Search from "../search"

// TODO: redesign this
export default function Guilds() {
  return (
    <>
      {/* TODO: implement bg'd navbar here */}
      <Navbar>
        <Heading size="md">Guilds</Heading>
      </Navbar>
      <Search query="" type={SearchType.GUILDS} hideHeading />
    </>
  )
}
