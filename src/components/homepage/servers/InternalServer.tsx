import { APIGuild } from "discord-api-types/v10"
import React from "react"
import http from "../../../util/http"
import { PatchcordRoutes } from "../../../util/http"
import { GuildIcon } from "../../guilds/GuildIcon"
import { TableRow } from "../../layout/table/rows/TableRow"

export const InternalServer: React.FC<{ id: string }> = ({ id }) => {
  const [data, setData] = React.useState<APIGuild>(null as any)

  React.useEffect(() => {
    http.get<APIGuild>(PatchcordRoutes.GUILD(id)).then(({ ok, data }) => {
      if (ok) setData(data);
    });
  }, [])

  if (!res) return <TableRow>Loading... ({id})</TableRow>

  return <TableRow icon={<GuildIcon d={res.data} />}>{res.data.name}</TableRow>
}
