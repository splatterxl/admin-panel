import React from "react"
import { RecentlyViewedUsersStore } from "../../../stores/RecentlyViewedStore"
import { UserCard } from "../../user/UserCard"
import { RecentlyViewed } from "./RecentlyViewed"

export const RecentlyViewedUsers: React.FC = () => {
  const [getValue, _, value] = RecentlyViewedUsersStore.useStateFromStorage()

  React.useEffect(() => {
    if (!value) getValue()
  }, [getValue, value])

  if (!value?.length) return null

  return (
    <RecentlyViewed>
      {value.map(({ data }) => (
        <UserCard key={data.id} d={data} h="full" />
      ))}
    </RecentlyViewed>
  )
}
