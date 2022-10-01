import { Center, Spinner } from "@chakra-ui/react"
import React from "react"
import CurrentUserGuildsStore from "../../../stores/CurrentUserGuildsStore"
import InternalServerStore, {
  IInternalServer,
} from "../../../stores/InternalServerStore"
import { arrayEquals } from "../../../util/array"
import { Constants, Endpoints } from "../../../util/constants"
import { getGuildsBulk } from "../../../util/routes/guilds"
import { Section } from "../../layout/section/Section"
import { Table } from "../../layout/table/Table"
import { Link } from "../../Link"
import { InternalServer } from "./InternalServer"

export const InternalServers: React.FC<{
  noHeading?: boolean
  truncate?: boolean
}> = ({ noHeading, truncate }) => {
  const joined = CurrentUserGuildsStore.useIDValues(),
    [, set, servers] = InternalServerStore.useStateFromStorage()

  React.useEffect(() => {
    // if we ever modify the internal guilds
    if (
      !arrayEquals(
        servers.map(({ id }) => id),
        Constants.INTERNAL_SERVERS
      )
    ) {
      getGuildsBulk({ ids: Constants.INTERNAL_SERVERS, admin: true }).then(
        (guilds) => {
          set(
            guilds.map(
              (guild): IInternalServer => ({
                id: guild.id,
                name: guild.name,
                icon: guild.icon,
              })
            )
          )
        }
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- this never needs to run more than once
  }, [])

  return (
    <Section
      heading={!noHeading ? "Internal Servers" : ""}
      actions={
        !noHeading ? (
          <Link href={Endpoints.INTERNAL_SERVERS} fontSize="sm" noDecor>
            View more
          </Link>
        ) : null
      }
    >
      {servers.length ? (
        <Table>
          {servers.slice(0, truncate ? 5 : servers.length).map((data) => (
            <InternalServer
              data={data}
              joined={joined === null ? null : joined!.includes(data.id)}
              key={data.id}
            />
          ))}
        </Table>
      ) : (
        <Center width="full" p={16}>
          <Spinner size="lg" />
        </Center>
      )}
    </Section>
  )
}
