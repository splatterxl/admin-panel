import React from "react"
import { User } from "../../../util/types"
import { UserCard } from "../../user/UserCard"

export const SearchUserResult: React.FC<{ d: User }> = ({ d }) => {
  return <UserCard d={d} compact />
}
