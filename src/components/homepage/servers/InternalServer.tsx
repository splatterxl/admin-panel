import { Button } from "@chakra-ui/react"
import React from "react"
import CurrentUserStore from "../../../stores/CurrentUserStore"
import { IInternalServer } from "../../../stores/InternalServerStore"
import { Endpoints } from "../../../util/constants"
import { joinGuild } from "../../../util/routes/users/guilds"
import { GuildIcon } from "../../guilds/GuildIcon"
import { TableRow } from "../../layout/table/rows/TableRow"

export const InternalServer: React.FC<{
  data: IInternalServer
  // if this is null the current user's joined servers list isn't loaded yet
  joined: boolean | null
}> = ({ data, joined }) => {
  const currentUser = CurrentUserStore.useValue()

  return (
    <TableRow
      icon={
        <GuildIcon id={data.id} hash={data.icon} name={data.name} size="sm" />
      }
      actions={
        <Button
          variant="outline"
          disabled={joined ?? true}
          rounded="sm"
          size="xs"
          isLoading={joined === null}
          onClick={async () => {
            await joinGuild(data.id, currentUser.id)
          }}
        >
          {joined ? "Joined" : "Join Server"}
        </Button>
      }
      href={Endpoints.GUILD(data.id)}
    >
      {data.name}
    </TableRow>
  )
}
