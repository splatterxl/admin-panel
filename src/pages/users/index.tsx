import { useSearchbarFocus } from "../../util/focus"
import Search from "../search"

export default function Users() {
  useSearchbarFocus()

  return Search("", "1")

  // TODO: FIX
  // const [getValue, _, value] = RecentlyViewedUsersStore.useStateFromStorage()
  //
  // React.useEffect(() => {
  //   if (!value) getValue()
  // })
  //
  // if (value?.length) {
  //   return (
  //     <>
  //       <Heading as="h2" size="md" fontStyle="italic" mb={2}>
  //         Jump back in...
  //       </Heading>
  //       <RecentlyViewedUsers />
  //     </>
  //   )
  // } else {
  //   return null
  // }
}
