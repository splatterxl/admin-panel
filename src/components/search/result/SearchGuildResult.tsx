import { APIGuild } from "discord-api-types/v10"
import React from "react"
import { GuildCard } from "../../guilds/legacy/GuildCard"

export const SearchGuildResult: React.FC<{ d: APIGuild }> = ({ d }) => {
  return <GuildCard d={d} compact />
}
