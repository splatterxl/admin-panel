import { Button } from "@chakra-ui/react"
import { APIGuild } from "discord-api-types/v10"
import React from "react"
import CurrentUserStore from "../../../stores/CurrentUserStore"
import { Endpoints, PatchcordRoutes } from "../../../util/constants"
import http from "../../../util/http"
import { joinGuild } from "../../../util/routes/users/guilds"
import { GuildIcon } from "../../guilds/GuildIcon"
import { TableRow } from "../../layout/table/rows/TableRow"

export const InternalServer: React.FC<{ id: string; isJoined: boolean }> = ({
  id,
  isJoined,
}) => {
  const [data, setData] = React.useState<APIGuild>(null as any),
    currentUser = CurrentUserStore.useValue()

  React.useEffect(() => {
    http.get<APIGuild>(PatchcordRoutes.GUILD(id)).then(({ ok, data }) => {
      if (ok) setData(data)
    })
  }, [id])

  if (!data) return <TableRow>Loading... ({id})</TableRow>

  return (
    <TableRow
      icon={<GuildIcon d={data} size="sm" />}
      actions={
        <Button
          variant="outline"
          disabled={isJoined}
          size="xs"
          onClick={async () => {
            await joinGuild(id, currentUser.id)
          }}
        >
          {isJoined ? "Joined" : "Join Server"}
        </Button>
      }
      href={Endpoints.GUILD(id)}
    >
      {data.name}
    </TableRow>
  )
}
