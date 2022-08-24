import { Heading } from "@chakra-ui/react"
import { RecentlyViewedUsers } from "../../components/homepage/recently/RecentlyViewedUsers"
import { RecentlyViewedUsersStore } from "../../stores/RecentlyViewedStore"
import { useSearchbarFocus } from "../../util/focus"

export default function Users() {
  useSearchbarFocus()

  const value = RecentlyViewedUsersStore.useValue()

  if (value.length) {
    return (
      <>
        <Heading as="h2" size="md" fontStyle="italic" mb={2}>
          Jump back in...
        </Heading>
        <RecentlyViewedUsers />
      </>
    )
  } else {
    return null
  }
}
