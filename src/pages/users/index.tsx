import { Heading } from "@chakra-ui/react"
import { Navbar } from "../../components/layout/navbar/Navbar"
import { SearchType } from "../../stores/SearchTypeStore"
import Search from "../search"

// TODO: redesign this
export default function Users() {
  return (
    <>
      {/* TODO: implement the bg'd navbar here */}
      <Navbar>
        <Heading size="md">Users</Heading>
      </Navbar>
      <Search query="" type={SearchType.USERS} hideHeading />
    </>
  )
}
