import { Heading } from "@chakra-ui/react"
import React from "react"
import { RecentlyViewedUsers } from "../../components/homepage/recently/RecentlyViewedUsers"
import { RecentlyViewedUsersStore } from "../../stores/RecentlyViewedStore"
import { useSearchbarFocus } from "../../util/focus"

export default function Users() {
  useSearchbarFocus()

  const [getValue, _, value] = RecentlyViewedUsersStore.useStateFromStorage()

  React.useEffect(() => {
    if (!value) getValue()
  })

  if (value?.length) {
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
