import { APIGuild, Routes } from "discord-api-types/v10"
import useSWR from "swr"
import http from "../../../util/http"
import { GuildIcon } from "../../guilds/GuildIcon"
import { TableRow } from "../../layout/table/rows/TableRow"

export const InternalServer: React.FC<{ id: string }> = ({ id }) => {
  const { data: res, error } = useSWR(Routes.guild(id), http.get<APIGuild>)

  if (!res) return <TableRow>Loading... ({id})</TableRow>

  return <TableRow icon={<GuildIcon d={res.data} />}>{res.data.name}</TableRow>
}
