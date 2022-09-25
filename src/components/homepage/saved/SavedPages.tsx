import { Center, Spinner } from "@chakra-ui/react"
import React from "react"
import SavedPagesStore from "../../../stores/SavedPagesStore"
import { Section } from "../../layout/section/Section"
import { Table } from "../../layout/table/Table"
import { SavedPage } from "./SavedPage"

export const SavedPages: React.FC = () => {
  const value = SavedPagesStore.useValue()

  return (
    <Section heading="Saved Pages">
      {value !== null ? (
        value.length ? (
          <Table>
            {value.map((page) => (
              <SavedPage key={page.id} {...page} />
            ))}
          </Table>
        ) : null
      ) : (
        <Center width="full" p={16}>
          <Spinner size="lg" />
        </Center>
      )}
    </Section>
  )
}
