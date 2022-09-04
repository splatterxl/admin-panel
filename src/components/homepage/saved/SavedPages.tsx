import { Center, HStack, Icon, Spinner } from "@chakra-ui/react"
import React from "react"
import { MdServer } from "../../../icons/tabs/Server"
import SavedPagesStore from "../../../stores/SavedPagesStore"
import { Section } from "../../layout/section/Section"
import { TableRow } from "../../layout/table/rows/TableRow"
import { Table } from "../../layout/table/Table"
import { SavedPage } from "./SavedPage"

export const SavedPages: React.FC = () => {
  const [get, set, value] = SavedPagesStore.useStateFromStorage()

  React.useEffect(() => {
    get()
  }, [get])

  return (
    <Section heading="Saved Pages">
      {value !== null ? (
        <Table>
          {value.length ? (
            value.map((page) => <SavedPage key={page.id} {...page} />)
          ) : (
            <Center
              width="full"
              p={16}
              fontSize="sm"
              opacity={0.6}
              userSelect="none"
            >
              Nothing to see here, yet
            </Center>
          )}
        </Table>
      ) : (
        <Center width="full" p={16}>
          <Spinner size="lg" />
        </Center>
      )}
    </Section>
  )
}
