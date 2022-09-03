import { Center, Spinner } from "@chakra-ui/react"
import {
  RESTGetAPICurrentUserGuildsResult,
  Routes,
  Snowflake,
} from "discord-api-types/v10"
import React from "react"
import { Endpoints } from "../../../util/constants"
import http from "../../../util/http"
import { Section } from "../../layout/section/Section"
import { Table } from "../../layout/table/Table"
import { Link } from "../../Link"
import { InternalServer } from "./InternalServer"

export const _INTERNAL_SERVERS = [
  "996497764957290496",
  "998301153454194861",
  "1010958439087603762",
  "1015298503867367507",
]

export const InternalServers: React.FC = () => {
  const [data, setData] = React.useState<Snowflake[]>(null as any)

  React.useEffect(() => {
    http
      .get<RESTGetAPICurrentUserGuildsResult>(Routes.userGuilds())
      .then(({ ok, data }) => {
        if (ok) setData(data.map((v) => v.id))
      })
  }, [])

  return (
    <Section
      heading="Internal Servers"
      actions={
        <Link href={Endpoints.INTERNAL_SERVERS} fontSize="sm" noDecor>
          View more
        </Link>
      }
    >
      {data ? (
        <Table>
          {_INTERNAL_SERVERS.map((id) => (
            <InternalServer id={id} isJoined={data.includes(id)} key={id} />
          ))}
        </Table>
      ) : (
        <Center w="full" p={16}>
          <Spinner size="lg" />
        </Center>
      )}
    </Section>
  )
}
