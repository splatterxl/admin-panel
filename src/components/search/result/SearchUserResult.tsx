import { APIUser } from "discord-api-types/v10"
import React from "react"
import { UserCard } from "../../user/UserCard"

export const SearchUserResult: React.FC<{ d: APIUser }> = ({ d }) => {
  return <UserCard d={d} compact />
}
