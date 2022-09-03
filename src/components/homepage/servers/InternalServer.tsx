import { APIGuild } from "discord-api-types/v10"
import React from "react"
import http from "../../../util/http"
import { PatchcordRoutes } from "../../../util/constants"
import { GuildIcon } from "../../guilds/GuildIcon"
import { TableRow } from "../../layout/table/rows/TableRow"

export const InternalServer: React.FC<{ id: string }> = ({ id }) => {
  const [data, setData] = React.useState<APIGuild>(null as any)

  React.useEffect(() => {
    http.get<APIGuild>(PatchcordRoutes.GUILD(id)).then(({ ok, data }) => {
      if (ok) setData(data);
    });
  }, [])

  if (!data) return <TableRow>Loading... ({id})</TableRow>

  return <TableRow icon={<GuildIcon d={data} w={6} />}>{data.name}</TableRow>
}